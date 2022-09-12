export * from "./register.mjs";

// URL'S
const baseURL = "https://nf-api.onrender.com/";
const statusUrl = "status/"
const registerUrl = "api/v1/social/auth/register";
const loginUrl = "api/v1/social/auth/login";

// DIFFERENT BODIES

// registerBody is head of fetch with POST method with all values from register form
let registerBody;
// values is the object with all the values from form submit without the head
let values;
// loginValues is the values needed for login, derived from the variable "values"
let loginValues;
// loginBody is head of fetch with POST method with values needed for login
let loginBody;


// DOM variables
const form = document.querySelector('#signUpForm');

// Function collects data from inputs and puts them in object "values";
function registerSubmit(event) {
    event.preventDefault();
    // creates new object from FormData on submit 
    const data = new FormData(event.target);
    // transforms key value pairs into an object
    values = Object.fromEntries(data.entries());
    console.log(values);
    // Body for fetch when user is registering
    registerBody = {
        method: 'POST',
        body: JSON.stringify({ ...values }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }
    // Run async function that sends fetch request 
    registerFetch(baseURL + registerUrl, registerBody);

    // Run function to create "loginValues" object from "values" object
    loginValues = createLoginValues(values);

    // Body for when user is logging in
    loginBody = {
        method: 'POST',
        body: JSON.stringify({ ...loginValues }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }
    // Run function with loginValues to automatically login after register
    loginFetch(baseURL + loginUrl, loginBody);

}




// Async fetch function with URL and Body as parameters. 
async function registerFetch(url, body) {
    try {
        const response = await fetch(url, body);
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.log(error)
    }
}

// Async fetch function with URL and Body as parameters. 
async function loginFetch(url, body) {
    try {
        const response = await fetch(url, body);
        const data = await response.json();
        console.log(data);
        // collects accessToken in variable and sends to local storage
        accessToken = data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        // redirects user to homepage once logged in
        // window.location.href = "../../../src/index.html";
    }
    catch (error) {
        console.log(error)
    }
}






// Function for creating loginValues from the variable values
function createLoginValues(values) {
    delete values.name;
    return values;
}

// addEventListener on submit of form
form.addEventListener('submit', registerSubmit);