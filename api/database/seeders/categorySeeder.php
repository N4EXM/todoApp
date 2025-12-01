<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class categorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create users first if none exist
        if (User::count() === 0) {
            User::factory()->count(5)->create();
        }

        $users = User::all();
        
        // Create posts with explicit user_id assignment
        Category::factory()->count(50)->create([
            'user_id' => function () use ($users) {
                return $users->random()->id;
            }
        ]);

    }
}
