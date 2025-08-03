<?php

use Illuminate\Http\Request;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('todos', TodoController::class);

// For updating title
Route::patch('/todos/{todo}/title', [TodoController::class, 'updateTitle']);
// For updating completion status
Route::patch('/todos/{todo}/status', [TodoController::class, 'updateStatus']);