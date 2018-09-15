<?php namespace App\Commands;

use App;
use Log;
use App\Commands\Command;
use App\Models\Inquiry;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class HubspotPost extends Command implements ShouldQueue
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
        if (App::environment() != 'local') {
            $inquiry = $this->inquiry;

            $hs_context = [
                'hutk' => $inquiry['hubspotutk'],
                'ipAddress' => $inquiry['ipaddress'],
                'pageUrl' => $inquiry['submitpageurl'],
                'pageName' => $inquiry['submitpagetitle']
            ];

            $hs_context_json = json_encode($hs_context);

            $str_post = "firstname=" . urlencode($inquiry['first_name'])
                . "&lastname=" . urlencode($inquiry['last_name'])
                . "&email=" . urlencode($inquiry['email'])
                . "&phone=" . urlencode($inquiry['phone'])
                . "&hs_context=" . urlencode($hs_context_json);

            $ch = @curl_init();
            @curl_setopt($ch, CURLOPT_POST, true);
            @curl_setopt($ch, CURLOPT_POSTFIELDS, $str_post);
            @curl_setopt($ch, CURLOPT_URL, 'https://forms.hubspot.com/uploads/form/v2/3434592/bb15b110-cd2d-4991-9f9d-93d8f167ed35');
            @curl_setopt($ch, CURLOPT_HTTPHEADER, [ 'Content-Type: application/x-www-form-urlencoded' ]);
            @curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $response = @curl_exec($ch);
            $status_code = @curl_getinfo($ch, CURLINFO_HTTP_CODE);
            @curl_close($ch);

            Log::info('Hubspot Submission | Code: ' . $status_code . ' | Response: ' . $response);
        }
    }

}
