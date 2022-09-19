

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

export function createHeaderAllUsers(accessToken) {
    return {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${accessToken}`
        },
    }
}