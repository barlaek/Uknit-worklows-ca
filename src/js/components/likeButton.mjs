import { baseURL } from "../constants/constants.mjs";
import { likeFetch } from "../fetch/fetch.mjs";
import { likeHeader } from "../headers/headers.mjs";

/**
 * Function that sends the "like" fetch to the appropriate post
 * @param {array} array The array of results from the fetch
 * @param {number} loop The loop that is created to build all the posts
 * @param {string} accessToken The accessToken collected from local storage
 */
export async function like(array, loop, accessToken) {
    const id = array[loop].id;
    const likeUrl = baseURL + `api/v1/social/posts/${id}/react/👍`;
    const results = await likeFetch(likeUrl, likeHeader(accessToken));
  }
  