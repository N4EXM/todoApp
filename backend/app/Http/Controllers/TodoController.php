<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Todo::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'completed' => 'sometimes|boolean'
        ]);

        $todo = Todo::create($validated);
        return response()->json($todo, 201);
    }

    public function updateTitle(Request $request, Todo $todo)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255'
        ]);

        $todo->update(['title' => $validated['title']]);
        return response()->json($todo);
    }

    public function updateStatus(Request $request, Todo $todo)
    {
        $validated = $request->validate([
            'completed' => 'required|boolean'
        ]);

        $todo->update(['completed' => $validated['completed']]);
        return response()->json($todo);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        return $todo;
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, Todo $todo)
    // {
    //     $request->validate([
    //         'title' => 'sometimes|string|max:255',
    //         'completed' => 'sometimes|boolean',
    //     ]);

    //     $todo->update($request->only(['title', 'completed']));

    //     return $todo;
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response()->noContent();
    }
}
