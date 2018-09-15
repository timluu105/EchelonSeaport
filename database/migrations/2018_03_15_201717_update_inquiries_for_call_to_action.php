<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateInquiriesForCallToAction extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('inquiries', function(Blueprint $table) {
            $table->dropColumn('size');
            $table->dropColumn('broker');
            $table->dropColumn('street_address');
            $table->dropColumn('city');
            $table->dropColumn('state');
            $table->dropColumn('zip');
            $table->dropColumn('broker_name');
            $table->dropColumn('broker_email');
            $table->dropColumn('broker_phone');
            $table->dropColumn('broker_company');
            $table->dropColumn('rep_bro');
            $table->string('email')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('inquiries', function(Blueprint $table) {
            $table->string('size')->nullable();
            $table->boolean('broker')->default(false);
            $table->string('street_address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            $table->string("broker_name")->nullable();
            $table->string("broker_email")->nullable();
            $table->string("broker_phone")->nullable();
            $table->string("broker_company")->nullable();
            $table->string('rep_bro')->nullable();
            $table->string('email')->change();
        });
    }
}
