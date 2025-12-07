// get users tasks
export async function getCategoriesTasks(categoryId) {

    try {

        const response = await fetch(`/api/categories/${categoryId}/tasks`, {
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