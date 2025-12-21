// get users tasks
export async function getCategoriesTasks(category_id) {

    try {

        const response = await fetch(`/api/tasks/${category_id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include' // Important for cookies
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        console.log(data)

        return data

    }
    catch (error) {
        console.log(error)
    }

}

export async function updateTask(id, title, description, due_date, is_completed, priority) {
    
    try {

        const response = await fetch(`/api/task/${id}`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({title, description, due_date, is_completed, priority})

        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = response.json()

        return data

    }
    catch (error) {
        console.log(error)
    }

}

export async function toggleIsCompleted(id, is_completed) {

    try {

        const response = await fetch(`/api/task/${id}/completed`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ is_completed })

        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        // console.log(data)

        return data

    }

    catch (error) {
        console.log(error)
    }

} 

export async function getAllUserTasks(id) {
    
    try {

        const response = await fetch(`/api/${id}/tasks`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include' // Important for cookies
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        console.log(data)

        return data

    }
    catch (error) {
        console.log(error)
    }


}

export async function createTask(category_id, user_id, title, due_date, priority, description) {

    try {

        const response = await fetch('/api/task', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({category_id, user_id, title, due_date, priority, description})
        })

        if (!response.ok) {
            return 'failed to send to server'
        }

        const data = await response.json()

        return data

    }
    catch (error) {
        return error
    }

}

export async function deleteTask(id) {
    
    try {

        const response = await fetch(`/api/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        })


        console.log('Response status:', response.status);
        
        if (response.status === 403) {
            throw new Error('You are not authorized to delete this category.');
        }   
        
        if (response.status === 204) {
            // 204 No Content - return success without parsing JSON
            console.log('204 No Content - deletion successful');
            return { success: true };
        }
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Only parse JSON if there's content
        const data = await response.json();
        console.log('Response data:', data);
        
        return data;

    }
    catch (error) {
        return { success: false, error: error.message };
    }

}

export function sortTasksAZ(tasks) {
    return [...tasks].sort((a, b) => 
        a.title.localeCompare(b.title)
    );
}

export function sortTasksZA(tasks) {
    return [...tasks].sort((a, b) => 
        b.title.localeCompare(a.title)
    );
}

export function sortTasksByClosestDate(tasks) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight for day comparison

    return [...tasks].sort((a, b) => {
        // Handle missing dates
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
    
        // Get dates at midnight (ignore time)
        const getMidnight = (dateStr) => {
            const date = new Date(dateStr);
            date.setHours(0, 0, 0, 0);
            return date;
        };
    
        const dateA = getMidnight(a.due_date);
        const dateB = getMidnight(b.due_date);
    
        // Check if dates are in the past (overdue)
        const isAOverdue = dateA < today;
        const isBOverdue = dateB < today;
    
        // Overdue tasks come BEFORE future tasks
        if (isAOverdue && !isBOverdue) return -1;  // A is overdue, B is not
        if (!isAOverdue && isBOverdue) return 1;   // B is overdue, A is not
    
        // Calculate day differences
        const daysA = Math.round((dateA - today) / (1000 * 60 * 60 * 24));
        const daysB = Math.round((dateB - today) / (1000 * 60 * 60 * 24));
    
        // Both overdue: most recent overdue first (closest to today)
        if (isAOverdue && isBOverdue) {
            return daysB - daysA;  // Larger (less negative) comes first
        }
    
        // Both future: closest date first
        return daysA - daysB;  // Smaller positive number comes first
    });
}