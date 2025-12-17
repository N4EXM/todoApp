<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::inRandomOrder()->first() ?? User::factory()->create();
        $category = Category::inRandomOrder()->first() ?? User::factory()->create();

        return [
            'title' => $this->faker->sentence('8'),
            'description' => $this->faker->paragraph(1, false),
            'is_completed' => $this->faker->boolean(),
            'due_date' => $this->faker->dateTimeBetween($startDate = 'now', $endDate = '2026-01-30', $timezone = null),
            'priority' => $this->faker->randomElement(['Low', 'Medium', 'High']),
            'user_id' => $user->id,
            'category_id' => $category->id
        ];
    }
}
