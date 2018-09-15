<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddInquiriesTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inquiries', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email');
            $table->string('phone')->default('');
            $table->string('address');
            $table->string('size');
            $table->string('price_range');
            $table->boolean('broker')->default(false);
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
        Schema::drop('inquiries');
    }

}
