<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddHubspotFieldsToInquiries extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('inquiries', function(Blueprint $table) {
            $table->string('hubspotutk')->nullable();
            $table->string('ipaddress')->nullable();
            $table->string('submitpageurl')->nullable();
            $table->string('submitpagetitle')->nullable();
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
            $table->dropColumn('hubspotutk');
            $table->dropColumn('ipaddress');
            $table->dropColumn('submitpageurl');
            $table->dropColumn('submitpagetitle');
        });
    }
}
