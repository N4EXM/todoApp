<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'is_completed',
        'due_date',
        'priority',
        'user_id',
        'category_id'
    ];

    protected $casts = [
        'due_date' => 'datetime'
    ];

    // Boot method to handle events
    protected static function boot()
    {
        parent::boot();

        // Update category completion when task is saved (created or updated)
        static::saved(function ($task) {
            if ($task->category) {
                $task->category->updateCompletionPercentage();
            }
        });

        // Update category completion when task is deleted
        static::deleted(function ($task) {
            if ($task->category) {
                $task->category->updateCompletionPercentage();
            }
        });
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }

}
