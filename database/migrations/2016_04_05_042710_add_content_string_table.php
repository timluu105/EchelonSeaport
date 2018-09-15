<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddContentStringTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('content_string', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('section_id')->unsigned();
            $table->foreign('section_id')->references('id')->on('sections')->onDelete('cascade');
            $table->string('name');
            $table->unique([ 'section_id', 'name' ]);
            $table->string('data')->nullable();
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
        Schema::drop('content_string');
    }
}
