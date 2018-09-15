<?php namespace App\Commands;

use App;
use Log;
use App\Commands\Command;
use App\Models\Inquiry;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use GuzzleHttp\Client as Guzzle;

class SequentPost extends Command implements ShouldQueue
{

    use InteractsWithQueue;
    use SerializesModels;

    /**
     * The Inquiry this command is related to.
     *
     * @var App\Models\Inquiry
     */
    protected $inquiry;

    /**
     * Create a new command instance.
     *
     * @param  App\Models\Inquiry $inquiry
     * @return void
     */
    public function __construct(Inquiry $inquiry)
    {
        $this->inquiry = $inquiry;
    }

    /**
     * Execute the command.
     *
     * @return void
     */
    public function handle()
    {
        if ((env('SEQUENT_KEY') != null) && (App::environment() != 'local')) {
            $guzzle  = new Guzzle();
            $inquiry = $this->inquiry;

            // Parse the address for Sequent
            $address    = $inquiry->address;
            $street_num = '';
            $street     = '';
            $city       = '';
            $state      = '';
            $zip        = '';
            $country    = '';

            if ($address != '') {
                $addr = "https://maps.googleapis.com/maps/api/geocode/json?address=$address&key=" . env('GOOGLE_KEY');
                $res = $guzzle->get($addr);

                try {
                    if ($res->getStatusCode() == 200 && count(json_decode($res->getBody())->results) > 0) {
                        $r = json_decode($res->getBody())->results[0];
                        $r = $r->address_components;

                        foreach ($r as $a) {
                            switch ($a->types[0]) {
                                case 'street_number':
                                    $street_num = $a->long_name;
                                    break;
                                case 'route':
                                    $street = $a->long_name;
                                    break;
                                case 'locality':
                                    $city = $a->long_name;
                                    break;
                                case 'administrative_area_level_1':
                                    $state = $a->long_name;
                                    break;
                                case 'postal_code':
                                    $zip = $a->long_name;
                                    break;
                                case 'country':
                                    $country = $a->long_name;
                                    break;
                            }
                        }

                        // if parsing is successful replace the address with the street number followed by the street
                        $address = $street_num . ' ' . $street;
                    }
                } catch(Exception $e) {
                    Log::error('Unable to parse ' . $address . ': ' . $e);
                }
            }

            /*
             *  NOTE:
             *
             *  - the brokerage_company variable is dependent on you also setting (at least) the
             *    realtor_name variable. If you post ONLY brokerage_company it will not show up.
             *
             *  - If Debug mode is set to "0" (Off) then you will receive a return code of "1" for
             *    a successful post or a "0" (or nothing) for a failed post... This way you can
             *    have validation on your side as well...
             *
             *  client_type values:
             *
             *  24512: Online Broker Registrant
             *  24513: Online Prospective Purchaser
             *
             */

            return $guzzle->post('https://app.sequentsys.com/api_postform.php', [
                'form_params' => [
                    'seckey'            => env('SEQUENT_KEY'),
                    'debug'             => '0',
                    'client_type'       => $inquiry->broker ? '24512' : '24513',
                    'firstname'         => $inquiry->firstName(),
                    'lastname'          => $inquiry->lastName(),
                    'email'             => $inquiry->email,
                    'company'           => $inquiry->broker_company,
                    'address'           => $address,
                    'city'              => $city,
                    'state'             => $state,
                    'zip'               => $zip,
                    'country'           => $country,
                    'homephone'         => $inquiry->phone,
                    'cellphone'         => $inquiry->phone,
                    'comments'          => $inquiry->comments,
                    'floorplan'         => '',
                    'price_range'       => $inquiry->price_range,
                    'realtor_name'      => $inquiry->broker ? $inquiry->name : $inquiry->broker_name,
                    'realtor_phone'     => $inquiry->broker ? $inquiry->phone : $inquiry->broker_phone,
                    'realtor_email'     => $inquiry->broker ? $inquiry->email : $inquiry->broker_email,
                    'brokerage_company' => $inquiry->broker_company,
                    'hearfrom'          => $inquiry->hearfrom,
                    'hasbroker'         => $inquiry->repbro == 'yes' ? '1' : '0'
                ]
            ]);
        }
    }

}
