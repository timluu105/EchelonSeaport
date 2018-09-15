<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(UnitSeeder::class);
        $this->call(PressSeeder::class);
        $this->call(PageSeeder::class);
        $this->call(SectionSeeder::class);
    }
}
