import { createBody } from "../headers/headers.mjs";
import { registerUrl, baseURL, loginUrl } from "../constants/constants.mjs";
import { registerFetch } from "../fetch/fetch.mjs";
import { loginFetch } from "../fetch/fetch.mjs";


// DOM variables
const form = document.querySelector('#signUpForm');

// Function collects data from inputs and puts them in object "values";
function registerSubmit(event) {
    event.preventDefault();
    // creates new object from FormData on submit 
    const data = new FormData(event.target);
    // transforms key value pairs into an object
    const values = Object.fromEntries(data.entries());

    // Run async function that sends fetch request 
    registerFetch(baseURL + registerUrl, createBody(values));

    // Run function to create "loginValues" object from "values" object
    const loginValues = createLoginValues(values);
    console.log(loginValues);

    // Body for when user is logging in
    const loginBody = {
        method: 'POST',
        body: JSON.stringify({ ...loginValues }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }

    // Run function with loginValues to automatically login after register
    loginFetch(baseURL + loginUrl, loginBody);
}


// Function for creating loginValues from the variable values
function createLoginValues(values) {
    delete values.name;
    return values;
}

// addEventListener on submit of form
form.addEventListener('submit', registerSubmit);