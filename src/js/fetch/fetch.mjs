


// Async fetch function for login with URL and Body as parameters. 
export async function loginFetch(url, body) {
    try {
        const response = await fetch(url, body);
        const data = await response.json();
        console.log(data);
        // Collect accessToken and send to local storage
        const accessToken = data.accessToken;
        localStorage.setItem('accessToken', accessToken);

        const alertWrapper = document.querySelector('.alert-wrapper');
        // If user is rejected - preferably find a way to use status codes for this, not the token
        if (accessToken == undefined) {
            alertWrapper.innerHTML = `<h6>${data.message}</h6>`;
        }
        else {
            window.location.href = "../../../src/index.html";
        }
    }
    catch (error) {
        console.log(error);
    }
}

// Async fetch function for register with URL and Body as parameters. 
export async function registerFetch(url, body) {
    try {
        const response = await fetch(url, body);
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.log(error)
    }
}

