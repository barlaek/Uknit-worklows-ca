import { alertWrapper } from "../constants/constants.mjs";

// Async fetch function for login with URL and Body as parameters.
export async function loginFetch(url, body) {
  try {
    const response = await fetch(url, body);
    const data = await response.json();
    console.log(data);

    }
  } catch (error) {
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
    return data;
  }
  throw new Error(data.message);
}
