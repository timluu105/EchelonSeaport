<?php namespace App\Commands;

use App\Commands\Command;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ReorderCommand extends Command implements ShouldQueue {

    use InteractsWithQueue;
    use SerializesModels;

    /**
     * The model object that this command is related to.
     *
     * @var Object
     */
    protected $model;

    /**
     * The array to edit.
     *
     * @var array
     */
    protected $array;

    /**
     * Create a new command instance.
     *
     * @param  Object $model
     * @param  array $array
     * @return void
     */
    public function __construct($model, array $array)
    {
        $this->model = $model;
        $this->array = $array;
    }

    /**
     * Execute the command.
     *
     * @return void
     */
    public function handle()
    {
        foreach($this->array as $i => $item) {
            $_item = call_user_func($this->model . '::find', [$item])[0];
            $_item->order = $i;
            $_item->save();
        }
    }

}
