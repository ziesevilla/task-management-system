<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task; // ✅ Import your Task model

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Task::create([
            'title' => 'Finish Laravel Assignment',
            'description' => 'Complete the model, migration, and seeder setup for tasks.',
            'status' => 'pending',
            'due_date' => now()->addDays(3),
        ]);

        Task::create([
            'title' => 'Study React Integration',
            'description' => 'Review how Laravel API connects with React frontend.',
            'status' => 'in-progress',
            'due_date' => now()->addDays(5),
        ]);

        Task::create([
            'title' => 'Submit Project',
            'description' => null, // Nullable description
            'status' => 'completed',
            'due_date' => now()->addWeek(),
        ]);
    }
}
