<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class taskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (User::count() === 0) {
            User::factory()->count(5)->create();
        }

        $users = User::all();
        
        // Create posts with explicit user_id assignment
        Task::factory()->count(75)->create([
            'user_id' => function () use ($users) {
                return $users->random()->id;
            }
        ]);
    }
}
