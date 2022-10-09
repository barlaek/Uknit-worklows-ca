import { baseURL } from "../constants/constants.mjs";
import { standardFetch } from "../fetch/fetch.mjs";
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
  await standardFetch(likeUrl, likeHeader(accessToken));
  location.reload();
}

/**
 * Like function when on post specs page.
 * @param {number} id ID of post
 * @param {string} accessToken AccessToken
 */
export async function likeSpecs(id, accessToken) {
  const likeUrl = baseURL + `api/v1/social/posts/${id}/react/👍`;
  await standardFetch(likeUrl, likeHeader(accessToken));
  location.reload();
}