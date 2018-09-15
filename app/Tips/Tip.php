<?php namespace App\Tips;

use Illuminate\Support\Collection;

class Tip {

    /**
     * The chosen tip.
     *
     * @var string
     */
    protected $tip;

    /**
     * An array of tips.
     *
     * @var array
     */
    protected $tips = [
        'Write your own class that extends Tip'
    ];

    /**
     * Create a new Tip instance.
     *
     * @param  array $tips
     * @return void
     */
    public function __construct($tips = null)
    {
        if (!is_null($tips)) {
            $this->tips = $tips;
        }

        $this->handle();
    }

    /**
     * Handle the tip.
     *
     * @return void
     */
    public function handle()
    {
        $this->tip = Collection::make($this->tips)->random();
    }

    /**
     * Print out a tip
     *
     * @return string
     */
    public function __toString()
    {
        return $this->tip;
    }

}
