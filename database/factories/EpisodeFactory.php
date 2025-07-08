<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Episode>
 */
class EpisodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $number = 1;

        return [
            'number' => $number++,
            'views' => $this->faker->numberBetween(0, 10000),
            'views_app' => $this->faker->numberBetween(0, 10000),
            'anime_id' => 1,
        ];
    }
}
