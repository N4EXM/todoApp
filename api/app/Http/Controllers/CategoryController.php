<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\User;
use Database\Seeders\categorySeeder;
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

        $validated = $request->validate([
            'name' => 'required|string|max:20',
            'colour' => 'required|in:blue,yellow,red,green,purple,orange,pink,'
        ]);

        $category = Category::create($validated);

        if ($category) {
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
