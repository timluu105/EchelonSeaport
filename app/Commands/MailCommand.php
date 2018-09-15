<?php namespace App\Commands;

use Mail;

use App;
use App\Commands\Command;
use App\Models\Inquiry;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class MailCommand extends Command implements ShouldQueue
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
        if (App::environment() !== 'local' && env('MAIL_USERNAME') !== null && env('MAIL_PASSWORD') !== null) {
            // $inquiry = $this->inquiry;

            // Mail::send('emails.registrant', [ 'inquiry' => $inquiry ], function($m) use ($inquiry) {
            //     $m->to($inquiry->email, $inquiry->name)->subject('Thank you for registering!');
            // });

            // Mail::send('emails.client', [ 'inquiry' => $inquiry ], function($m) use ($inquiry) {
            //     $m->to('info@example.com', 'Name')->subject('New registrant!');
            // });
        }
    }

}
