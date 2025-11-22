<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class userSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Jane Writer',
            'email' => 'writer@blog.com',
            'password' => bcrypt('writer123'),
        ]);
        User::factory()->count(10)->create();   
    }
}
