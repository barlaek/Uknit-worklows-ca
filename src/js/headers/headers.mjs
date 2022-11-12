

// Create Body
export function createBody(values) {
    return {
        method: 'POST',
        body: JSON.stringify({ ...values }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }
}

// Edit profile PUT fetch
export function editProfileBody(values, accessToken) {
    return {
        method: 'PUT',
        body: JSON.stringify({ ...values }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${accessToken}`
        },
    }
}


// Get all posts
export function createHeaderAllPosts(accessToken) {
    return {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${accessToken}`
        },
    }
}

// SAME HEADER AGAIN
export function standardHeader(accessToken) {
    return {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${accessToken}`
        },
    }
}

// SAME HEADER AGAIN!!! 
export function standardPOSTHeader(values, accessToken) {
    return {
        method: 'POST',
        body: JSON.stringify({ ...values }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${accessToken}`
        },
    }
}

// Like header
export function likeHeader(accessToken) {
    return {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    }
}

// DELETE header
export function deleteHeader(accessToken) {
    return {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    }
}