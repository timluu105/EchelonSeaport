<?php namespace App\Commands;

use Newsletter;
use Log;

use App;
use App\Commands\Command;
use App\Models\Inquiry;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class MailChimpCommand extends Command implements ShouldQueue
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
     * @param  App\Models\Inquiry
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
        if (env('MAILCHIMP_APIKEY') != null && env('MAILCHIMP_LISTID') != null) {
            $inquiry = $this->inquiry;

            $name  = $inquiry['name'];
            $fname = preg_replace('/ .*$/', '', $name);
            $lname = preg_match('/. ./', $name) === 1 ? preg_replace('/^[^ ][^ ]* /', '', $name) : '';
            $email = $inquiry['email'];

            // Submit the subscription request
            Newsletter::subscribeOrUpdate($email, [
                'FNAME' => $fname,
                'LNAME' => $lname
            ]);

            if (!Newsletter::lastActionSucceeded()) {
                Log::info('Mail Chimp Error: ' . Newsletter::getLastError());
            }
        }
    }

}
