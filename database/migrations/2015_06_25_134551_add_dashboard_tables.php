<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDashboardTables extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('login_history', function(Blueprint $table) {
            $table->increments('id');
            $table->string('email');
            $table->string('ip');
            $table->string('user_agent');
            $table->boolean('successful');
            $table->timestamps();
        });

        Schema::create('meta', function(Blueprint $table) {
            $table->increments('id');
            $table->string('page');
            $table->string('title');
            $table->text('description');
            $table->boolean('enabled')->default(false);
            $table->text('keywords');
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('permissions', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('bits')->unsigned()->default(0);
            $table->integer('user')->unsigned();
            $table->string('page');
            $table->timestamps();
            $table->foreign('user')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('permissions');
        Schema::drop('meta');
        Schema::drop('login_history');
    }

}
