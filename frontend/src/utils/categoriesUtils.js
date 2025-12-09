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
            // console.log(data.categories)
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

// export async function getCategoryPerentage(id) {
    
//     try {

//         const response = await fetch(`/api/users/${id}/categories/percentage`,{
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//             },
//             credentials: 'include' // Important for cookies
//         })

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const data = await response.json()

//         if (data.success == true) {
//             // console.log(data.categories)
//             return data.percentage_completion
//         }
//         else {
//             return false
//         }

//     }
//     catch (error) {
//         throw Error(error)
//     }


// }