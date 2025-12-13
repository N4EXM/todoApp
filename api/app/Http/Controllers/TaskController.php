<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Models\Category;
use ErrorException;
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

    public function getTasksByCategory($categoryId)
    {
        $category = Category::findOrFail($categoryId);
        
        // Check ownership
        if (auth()->id() !== $category->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access'
            ], 403);
        }
        
        $tasks = Task::where('category_id', $categoryId)
                    ->latest()
                    ->get();
        
        if ($tasks) {
            return response()->json([
                'success' => true,
                'tasks' => $tasks 
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

    // public function update(Request $request, Task $task) {

    //     try {
    //         $validated = $request->validate([
    //             'title' => 'required|string|max:127',
    //             'description' => 'required|string|max:255',
    //             'is_completed' => 'required|boolean',
    //             'due_date' => 'required|string',
    //             'priority' => 'required|string'
    //         ]);

    //         $task->update($validated);
    
    //         if ($task) {
    //             return response()->json([
    //                 'success' => true,                
    //             ]);
    //         }
    //     }
    //     catch (ErrorException $e) {
    //         return response()->json([
    //             'message' => $e
    //         ]);
    //     }

    // }

    // public function toggleIsCompleted(Request $request, Task $task)
    // {
    //     // Add authorization check
    //     if ($task->user_id !== auth()->id()) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Unauthorized to update this post'
    //         ], 403);
    //     }

    //     $validated = $request->validate([
    //         'is_completed' => 'required|boolean'
    //     ]);

    //     try {
    //         $updated = $task->update($validated);

    //         if ($updated) {
    //             return response()->json([
    //                 'success' => true,
    //                 'message' => 'task toggled successfully',
    //                 'data' => $task->fresh() // Get fresh data from database
    //             ]);
    //         } else {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'No changes were made to the task'
    //             ], 422);
    //         }

    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Server error while updating post',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }

public function toggleIsCompleted(Request $request, Task $task)
{
    // Add authorization check
    if ($task->user_id !== auth()->id()) {
        return response()->json([
            'success' => false,
            'message' => 'Unauthorized to update this task'
        ], 403);
    }

    $validated = $request->validate([
        'is_completed' => 'required|boolean'
    ]);

    try {
        // Update the task
        $updated = $task->update($validated);
        
        // Load the category relationship
        $task->load('category');
        
        // Update the category's completion percentage
        if ($task->category) {
            $task->category->updateCompletionPercentage();
            $category = $task->category->fresh(); // Get fresh category data
        }

        if ($updated) {
            return response()->json([
                'success' => true,
                'message' => 'Task toggled successfully',
                'task' => $task->fresh(),
                'category' => $category ?? null // Include updated category
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'No changes were made to the task'
            ], 422);
        }

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Server error while updating task',
            'error' => $e->getMessage()
        ], 500);
    }
}


    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }   

}
