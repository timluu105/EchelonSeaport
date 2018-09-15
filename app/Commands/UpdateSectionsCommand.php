<?php namespace App\Commands;

use App\Commands\Command;

use App\Models\Sections;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateSectionsCommand extends Command implements ShouldQueue {

    use InteractsWithQueue;
    use SerializesModels;

    /**
     * The sections object that this command is related to.
     *
     * @var App\Models\Sections
     */
    protected $sections;

    /**
     * The column to edit.
     *
     * @var string
     */
    protected $column;

    /**
     * The value to fill the column with.
     *
     * @var string
     */
    protected $value;

    /**
     * Boolean Or String
     *
     * @param  string value
     * @return boolean OR string
     */
    public function booleanOrString($value)
    {
        return $value === 'true'  ? filter_var($value, FILTER_VALIDATE_BOOLEAN) :
               $value === 'false' ? filter_var($value, FILTER_VALIDATE_BOOLEAN) : $value;
    }

    /**
     * Create a new command instance.
     *
     * @param  Sections $sections
     * @param  string   $column
     * @param  $value
     * @return void
     */
    public function __construct(Sections $sections, $column, $value)
    {
        $this->sections = $sections;
        $this->column = $column;
        $this->value = $value;
    }

    /**
     * Execute the command.
     *
     * @return void
     */
    public function handle()
    {
        $this->sections->{$this->column} = $this->booleanOrString($this->value);
        $this->sections->save();
    }

}
