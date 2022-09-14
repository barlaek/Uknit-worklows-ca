export * from "./register.mjs";

// REGISTER ACCOUNT
const baseURL = "https://nf-api.onrender.com/";

// DOM variables
const form = document.querySelector("#signUpForm");

// Function collects data from inputs and puts them in object "values";
function formSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const values = Object.fromEntries(data.entries());
  console.log({ values });
}

// addEventListener on submit of form
form.addEventListener("submit", formSubmit);
