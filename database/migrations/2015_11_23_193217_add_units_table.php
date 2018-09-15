<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUnitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('units', function(Blueprint $table) {
            $table->increments('id');
            $table->boolean('available');
            $table->string('residence');
            $table->string('beds');
            $table->string('baths');
            $table->string('area');
            $table->string('price');
            $table->string('floor_plan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('units');
    }
}
