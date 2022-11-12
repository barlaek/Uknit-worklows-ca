import { createBody } from "../headers/headers.mjs";
import { registerUrl, baseURL, loginUrl } from "../constants/constants.mjs";
import { registerFetch } from "../fetch/fetch.mjs";
import { loginFetch } from "../fetch/fetch.mjs";
import { alertWrapper } from "../constants/constants.mjs";


// DOM variables
const form = document.querySelector('#signUpForm');

// Function collects data from inputs and puts them in object "values";
async function registerSubmit(event) {
    event.preventDefault();
    // creates new object from FormData on submit 
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());

    try {
        // Run async function that sends fetch request 
        await registerFetch(baseURL + registerUrl, createBody(values));
    } catch (e) {
        alertWrapper.innerHTML = `<h6>${e}</h6>`;
        return; // code stops here if try throws an error
    }
    try {
        // Run function to create "loginValues" object from "values" object
        const loginValues = createLoginValues(values);
        // Run function with loginValues to automatically login after register
        await loginFetch(baseURL + loginUrl, createBody(loginValues));
    } catch (e) {
        console.log(e);
    }
}


// Function for creating loginValues from the variable values
function createLoginValues(values) {
    delete values.name;
    return values;
}

// addEventListener on submit of form
form.addEventListener('submit', registerSubmit);


