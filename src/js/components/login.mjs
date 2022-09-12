// URL'S
const baseURL = "https://nf-api.onrender.com/";
const loginUrl = "api/v1/social/auth/login";

// Variables
let values;
let loginBody;

// AccessToken
let accessToken;

// DOM
const form = document.querySelector('#loginForm');
const alertWrapper = document.querySelector('.alert-wrapper');

// Function collects data from inputs and puts them in object "values";
function loginSubmit(event) {
    event.preventDefault();

    // creates new object from FormData on submit 
    const data = new FormData(event.target);
    // transforms key value pairs into an object
    values = Object.fromEntries(data.entries());
    console.log(values);

    // Body for fetch when user is registering
    loginBody = {
        method: 'POST',
        body: JSON.stringify({ ...values }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }

    // Run async function that sends fetch request 
    loginFetch(baseURL + loginUrl, loginBody);
}


// Async fetch function with URL and Body as parameters. 
async function getResponse(url, body) {
    try {
        const response = await fetch(url, body);
        const data = await response.json();
        console.log(data);
        // Collect accessToken and send to local storage
        accessToken = data.accessToken;
        localStorage.setItem('accessToken', accessToken);

        if (accessToken == undefined) {
            alertWrapper.innerHTML = `<p>${data.message}</p>`;
        }
        else {
            window.location.href = "../../../src/index.html";
        }

    }
    catch (error) {
        console.log(error);
    }
}

// addEventListener on submit of form
form.addEventListener('submit', loginSubmit);