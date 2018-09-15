<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SetPressColumnsNullable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('press', function(Blueprint $table) {
            $table->text('description')->nullable()->change();
            $table->text('publisher')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('press', function(Blueprint $table) {
            $table->text('description')->change();
            $table->text('publisher')->change();
        });
    }
}
