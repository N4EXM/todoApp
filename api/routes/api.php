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

    // user
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);    

    // categories
    Route::get('/{user}/categories', [CategoryController::class, 'getUserCategories']);
    Route::delete('/{category}/categories', [CategoryController::class, 'destroy']);
    Route::get('/category/{categoryId}', [CategoryController::class, 'categoryDetails']);
    Route::post('/category', [CategoryController::class, 'store']);

    // tasks
    Route::get('/{user}/tasks', [TaskController::class, 'getUserTasks']);
    Route::get('/tasks/{category}', [TaskController::class, 'getTasksByCategory']);  
    Route::put('/task/{task}', [TaskController::class, 'update']);
    Route::put('/task/{task}/completed', [TaskController::class, 'toggleIsCompleted']); 


});