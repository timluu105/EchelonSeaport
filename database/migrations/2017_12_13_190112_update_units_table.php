<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUnitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('units', function(Blueprint $table) {
            $table->string('building')->nullable();
            $table->string('exterior')->nullable();
            $table->string('cc')->nullable();
            $table->string('taxes')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('units', function(Blueprint $table) {
            $table->dropColumn('building');
            $table->dropColumn('exterior');
            $table->dropColumn('cc');
            $table->dropColumn('taxes');
        });
    }
}
