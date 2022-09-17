import { alertWrapper } from "../constants/constants.mjs";

// Async fetch function for login with URL and Body as parameters. 
export async function loginFetch(url, body) {
    try {
        const response = await fetch(url, body);
        const data = await response.json();
        console.log(data);

        // If user is rejected - preferably find a way to use status codes for this, not the token
        if (!response.ok) {
            alertWrapper.innerHTML = `<h6>${data.message}</h6>`;
        }
        else {
            // Collect accessToken and send to local storage
            const accessToken = data.accessToken;
            localStorage.setItem('accessToken', accessToken);
            window.location.href = "../../../public/posts.html";
        }
    }
    catch (error) {
        console.log(error);
    }
}

// Async fetch function for register with URL and Body as parameters. 
export async function registerFetch(url, body) {
    const response = await fetch(url, body);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
        return data;
    }
    throw new Error(data.message);
}

// ALL POSTS FETCH

export async function allPostsFetch(url, body) {
    const response = await fetch(url, body);
    const data = await response.json();
    console.log(data);
}