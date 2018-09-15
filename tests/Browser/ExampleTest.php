<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ExampleTest extends DuskTestCase
{
    /**
     * A basic browser test example.
     *
     * @return void
     */
    public function testBasicExample()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->assertTitle('Title');
        });
    }

    public function testNeighborhood()
    {
        $this->browse(function (Browser $browser) {

            $pages = [
                'neighborhood',
                'architecture-and-design',
                'lifestyle',
                'residences',
                'floorplan-and-availability',
                'news',
                'gallery',
                'team',
                'contact'
            ];

            foreach ($pages as $key => $page) {
                $browser->visit('/' . $page)
                        ->assertDontSee('lol-lmao');
                $browser->resize(1280, 768)->pause(1000);
                $dimensions = $browser->element('#app')->getSize();
                $browser->resize(1280, $dimensions->getHeight())->screenshot($page);
            }
        });
    }



}
