import { alertWrapper } from "../constants/constants.mjs";

/**
 * Fetch used to log in
 * If response is not ok, display error. If response is ok, store accessToken and username and redirect to homepage.
 * @param {string} url Url of the fetch
 * @param {string} body Header, accessTokens etc
 */
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
      window.location.href = "../../../public/home/";
    }
  }
  catch (error) {
    console.log(error);
  }
}

/**
 * The fetch for registering new user. 
 * If response is ok, return data. If not, throw new error. 
 * @param {string} url 
 * @param {string} body 
 * @returns 
 */
export async function registerFetch(url, body) {
  const response = await fetch(url, body);
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.message);
}

/**
 * A fetch that can be used multiple places.
 * @param {string} url 
 * @param {string} body 
 * @returns 
 */
export async function standardFetch(url, body) {
  const response = await fetch(url, body);
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    return data;
  }
  throw new Error(data.message);
}

