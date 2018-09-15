<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddContentTextTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('content_text', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('section_id')->unsigned();
            $table->foreign('section_id')->references('id')->on('sections')->onDelete('cascade');
            $table->string('name');
            $table->unique([ 'section_id', 'name' ]);
            $table->text('data')->nullable();
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
        Schema::drop('content_text');
    }
}
