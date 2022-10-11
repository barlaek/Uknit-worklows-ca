import { baseURL } from "../constants/constants.mjs";
import { likeHeader } from "../headers/headers.mjs";
import { standardFetch } from "../fetch/fetch.mjs";

/**
 * Function to follow users 
 * @param {array} array The array of results from fetch of all posts
 * @param {number} loop The loop that is used to create the posts
 * @param {string} accessToken The accessToken
 */
export async function follow(array, loop, accessToken) {
    const { author: { name: nameFollow } } = array[loop]
    const followUrl = baseURL + `api/v1/social/profiles/${nameFollow}/follow`;
    const results = await standardFetch(followUrl, likeHeader(accessToken));
    console.log(results);
}