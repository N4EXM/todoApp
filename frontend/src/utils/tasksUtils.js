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

        return data

    }
    catch (error) {
        console.log(error)
    }

}