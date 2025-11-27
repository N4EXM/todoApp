<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    
    public function getUserTasks(User $user) {
        
        $tasks = $user
                ->tasks()
                // ->with('user:id, email')
                ->latest()
                ->get();

        if ($tasks) {
            return response()->json([
                'success' => true,
                'data' => $tasks 
            ]);
        }
        else {
            return response()->json([
                'success' => false
            ]);
        }

    }   

    public function store(Request $request) {
        
        $validated = $request->validate([
            'title' => 'required|string|max:127',
            'description' => 'required|string|max:255',
            'is_completed' => 'required|boolean',
            'due_date' => 'required|string',
            'priority' => 'required|string'
        ]);

        $task = Task::create($validated);

        if ($task) {
            return response()->json([
                'success' => true
            ]);
        }
        else {
            return response()->json([
                'success' => false
            ]);
        }

    }

    public function update(Request $request, Task $task) {

        $validated = $request->validate([
            'title' => 'required|string|max:127',
            'description' => 'required|string|max:255',
            'is_completed' => 'required|boolean',
            'due_date' => 'required|string',
            'priority' => 'required|string'
        ]);

        $task->update($validated);

        if ($task) {
            return response()->json([
                'success' => true
            ]);
        }
        else {
            return response()->json([
                'success' => false
            ]);
        }

    }

    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json(null, 204);
    }   

}
