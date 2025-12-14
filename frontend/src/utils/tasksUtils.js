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

        // console.log(data)

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