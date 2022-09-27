import { alertWrapper } from "../constants/constants.mjs";

// Async fetch function for login with URL and Body as parameters. 
export async function loginFetch(url, body) {
    try {
        const response = await fetch(url, body);
        const data = await response.json();
        console.log(data);

        // If user is rejected
        if (!response.ok) {
            alertWrapper.innerHTML = `<h6>${data.message}</h6>`;
        }
        else {
            // Collect accessToken and send to local storage
            const accessToken = data.accessToken;
            localStorage.setItem('accessToken', accessToken);
            const username = data.name;
            localStorage.setItem('username', username);
            window.location.href = "../../../public/home/index.html";
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

// STANDARD FETCH
export async function standardFetch(url, body) {
    const response = await fetch(url, body);
    const data = await response.json();
    if (response.ok) {
        console.log(data);
        return data;
    }
    throw new Error(data.message);
}