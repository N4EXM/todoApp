export async function deleteCategory(id) {

    try {

        const token = localStorage.getItem('token')

        const response = await fetch(`/api/users/${id}/categories`, {
            method: 'DELETE', 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        }) 

        if (response.status === 403) {
            throw new Error('You are not authorized to delete this category.');
        }

        const data = await response.json()
    
        if (data.success === true) {    
            return true
        }
        else {
            return false
        }

    }
    catch (error) {
        console.error('error: ', error)
    }

}

export async function getUserCategories(id) {

    try {

        const response = await fetch(`/api/users/${id}/categories`,{
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
            return data.categories
        }
        else {
            return false
        }

    }
    catch (error) {
        throw Error(error)
    }

}