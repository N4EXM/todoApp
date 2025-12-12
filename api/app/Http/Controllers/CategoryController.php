<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\User;
use Database\Seeders\categorySeeder;
use Dotenv\Exception\ValidationException;
use ErrorException;
use Exception;
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
                'name' => 'required|string|max:20|unique:categories,name,NULL,id,user_id,' . auth()->id(),
            ]);
            
            // Add user_id to the validated data
            $validated['user_id'] = auth()->id();
            
            $category = Category::create($validated);

            if ($category) {
                return response()->json([
                    'success' => true,
                    'category' => $category 
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to create category'
                ]);
            }
        }
        catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }
        catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }        
    }

    public function destroy(Category $category)
    {
        // Check authorization
        if ($category->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        
        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully'
        ], 200); // Use 200 instead of 204
    }

    public function categoryDetails($categoryId) {

        $category = Category::with('user')->findOrFail($categoryId);
        return response()->json($category);
        
    }

}
