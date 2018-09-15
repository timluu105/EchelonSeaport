<?php namespace App\Commands;

use App\Commands\Command;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DeleteCommand extends Command implements ShouldQueue {

    use InteractsWithQueue;
    use SerializesModels;

    /**
     * The project object that this command is related to.
     *
     * @var Object
     */
    protected $object;

    /**
     * Create a new command instance.
     *
     * @param  Object $object
     * @return void
     */
    public function __construct($object)
    {
        $this->object = $object;
    }

    /**
     * Execute the command.
     *
     * @return void
     */
    public function handle()
    {
        $this->object->delete();
    }

}
