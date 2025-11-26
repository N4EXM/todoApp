<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class categoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    // protected $model = Category::model();

    public function definition(): array
    {

        $user = User::inRandomOrder()->first() ?? User::factory()->create();

        return [
            'name' => $this->faker->word(), 
            'colour' => $this->faker->safeColorName(),
            'user_id' => $user->id
        ];
    }
}
