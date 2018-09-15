<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class NewFormFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('inquiries', function(Blueprint $table) {
            $table->dropColumn('name');
            $table->dropColumn("address");
            $table->dropColumn("price_range");
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string("phone")->nullable()->change();
            $table->string('street_address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            $table->string('size')->nullable()->change();
            $table->string("broker_name")->nullable();
            $table->string("broker_email")->nullable();
            $table->string("broker_phone")->nullable();
            $table->string("broker_company")->nullable();
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
            $table->string('name');
            $table->string("address");
            $table->string("price_range");
            $table->string("phone")->change();
            $table->string('size')->change();
            $table->dropColumn('first_name');
            $table->dropColumn('last_name');
            $table->dropColumn('street_address');
            $table->dropColumn('city');
            $table->dropColumn('state');
            $table->dropColumn('zip');
            $table->dropColumn('size');
            $table->dropColumn("broker_name");
            $table->dropColumn("broker_email");
            $table->dropColumn("broker_phone");
            $table->dropColumn("broker_company");
        });
    }
}
