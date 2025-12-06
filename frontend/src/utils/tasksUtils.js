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

        if (data.success == true) {
            console.log(data)
            return data.tasks
        }
        else {
            return false
        }

    }
    catch (error) {
        console.log(error)
    }

}