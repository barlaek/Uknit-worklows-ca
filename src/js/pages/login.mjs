import { baseURL, loginUrl } from "../constants/constants.mjs";
import { createBody } from "../headers/headers.mjs";
import { loginFetch } from "../fetch/fetch.mjs";


// DOM
const loginForm = document.querySelector('#loginForm');

/**
 * Collects input values from form and puts them in object "values"
 * @param {event} event submit
 */
function loginSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    loginFetch(baseURL + loginUrl, createBody(values));
}

// addEventListener on submit of loginForm
loginForm.addEventListener('submit', loginSubmit);

