<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users/{user}/categories', [CategoryController::class, 'getUserCategories']);

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);    
    Route::get('/users/{user}/tasks', [TaskController::class, 'getUserTasks']);
});