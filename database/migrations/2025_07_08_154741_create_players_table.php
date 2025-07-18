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
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->unsignedTinyInteger('languaje');
            $table->foreignId('server_id')->constrained()->cascadeOnDelete();
            $table->foreignId('episode_id')->constrained()->cascadeOnDelete();
            $table->string('code_backup')->nullable();
            $table->timestamps();

            $table->unique(['code', 'episode_id', 'server_id'], 'unique_code_episode_server');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};
