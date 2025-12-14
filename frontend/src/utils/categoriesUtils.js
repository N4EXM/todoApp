export async function deleteCategory(id) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/${id}/categories`, {
            method: 'DELETE', 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

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

    } catch (error) {
        console.error('Error deleting category:', error);
        return { success: false, error: error.message };
    }
}

export async function getUserCategories(id) {

    try {

        const response = await fetch(`/api/${id}/categories`,{
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
            console.log(data.categories)
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

export async function getUpdatedCatgory(id) {
    
    try {

        const response = await fetch(`/api/category/${id}`, {
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

export async function createCategory(name) {
    
    try {

        const response = await fetch(`/api/category`, {

            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ name })

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