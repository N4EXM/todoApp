<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::get('/users/{user}/categories', [CategoryController::class, 'getUserCategories']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);    
    Route::get('/users/{user}/tasks', [TaskController::class, 'getUserTasks']);
    Route::get('/categories/{category}/tasks', [TaskController::class, 'getTasksByCategory']);    Route::get('/users/{user}/categories', [CategoryController::class, 'getUserCategories']);
    Route::delete('/users/{category}/categories', [CategoryController::class, 'destroy']);
});