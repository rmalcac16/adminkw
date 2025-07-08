<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('servers', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('embed')->nullable();
            $table->boolean('status')->default(true);
            $table->integer('position')->nullable();
            $table->boolean('show_on_web_desktop')->default(true);
            $table->boolean('show_on_web_mobile')->default(true);
            $table->boolean('show_on_app')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('servers');
    }
};
