<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\User;
use Database\Seeders\categorySeeder;
use Dotenv\Exception\ValidationException;
use ErrorException;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    
    public function getUserCategories(User $user) {

        $categories = $user
                        ->categories()
                        // ->with(relations: 'user:id, name, email')
                        ->latest()
                        ->get();

        if ($categories) {
            return response()->json([
                'success' => true,
                'categories' => $categories 
            ]);
        }
        else {
            return response()->json([
                'success' => false
            ]);
        }

    }

    public function store(Request $request) {

        try {

            $validated = $request->validate([
                'name' => 'required|string|max:20|unique:categories,name,NULL,id,user_id'.auth()->id()
            ]);
    
            $category = Category::create($validated);


            if ($category) {
                return response()->json([
                    'success' => true,
                    'category' => $category 
                ]);
            }
            else {
                return response()->json([
                    'success' => false,
                    'message' => 'failed to create category'
                ]);
            }

        }
        catch (ValidationException $e) {
            return response()->json([
                'message' => $e
            ]);
        }        
        

    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(true, 204);
    }

    public function categoryDetails($categoryId) {

        $category = Category::with('user')->findOrFail($categoryId);
        return response()->json($category);
        
    }

}
