<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'user_id',
        'completed',
        'percentage_completion'
    ];

    // Calculate completion percentage
    public function calculateCompletionPercentage()
    {
        $totalTasks = $this->tasks()->count();
        
        if ($totalTasks === 0) {
            return 0;
        }
        
        $completedTasks = $this->tasks()->where('is_completed', true)->count();
        
        return round(($completedTasks / $totalTasks) * 100);
    }

    // Update completion percentage
    public function updateCompletionPercentage()
    {
        $this->update([
            'percentage_completion' => $this->calculateCompletionPercentage()
        ]);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function tasks() {
        $this->hasMany(Task::class);
    }

}
