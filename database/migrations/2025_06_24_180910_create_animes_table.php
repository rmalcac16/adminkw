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
        Schema::create('animes', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->string('name_alternative')->nullable()->index();
            $table->string('slug')->unique();
            $table->string('banner')->nullable();
            $table->string('poster')->nullable();
            $table->text('overview')->nullable();
            $table->date('aired')->nullable()->index();
            $table->string('type')->default('TV');
            $table->tinyInteger('status')->default(0);
            $table->string('premiered')->nullable();
            $table->char('broadcast', 1)->nullable();
            $table->string('genres')->nullable();
            $table->string('rating')->nullable()->index();
            $table->integer('popularity')->default(0);
            $table->string('trailer')->nullable();
            $table->double('vote_average')->default(0);
            $table->unsignedBigInteger('prequel')->nullable();
            $table->unsignedBigInteger('sequel')->nullable();
            $table->string('related')->nullable();
            $table->integer('views')->default(0);
            $table->integer('views_app')->default(0);
            $table->boolean('isTopic')->default(false);
            $table->unsignedInteger('mal_id')->nullable();
            $table->unsignedInteger('tmdb_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animes');
    }
};
