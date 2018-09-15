<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPressTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('press', function(Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('description');
            $table->text('publisher');
            $table->text('url')->nullable();
            $table->date('date');
            $table->boolean('enabled')->default(false);
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
        Schema::drop('press');
    }
}
