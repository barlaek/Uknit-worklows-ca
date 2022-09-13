import { baseURL, loginUrl } from "../constants/constants.mjs";
import { createBody } from "../headers/headers.mjs";
import { loginFetch } from "../fetch/fetch.mjs";

// DOM
const loginForm = document.querySelector('#loginForm');

// Function collects data from inputs and puts them in object "values";
function loginSubmit(event) {
    event.preventDefault();
    // creates new object from FormData on submit 
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    // Run async function that sends fetch request 
    // Parameters are imported url and imported function that creates the body
    loginFetch(baseURL + loginUrl, createBody(values));
}

// addEventListener on submit of loginForm
loginForm.addEventListener('submit', loginSubmit); 