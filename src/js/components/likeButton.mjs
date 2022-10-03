import { baseURL } from "../constants/constants.mjs";
import { likeFetch } from "../fetch/fetch.mjs";
import { likeHeader } from "../headers/headers.mjs";

// LIKE 
export async function like(array, loop, accessToken) {
    const id = array[loop].id;
    console.log(id);
    const likeUrl = baseURL + `api/v1/social/posts/${id}/react/👍`;
    const results = await likeFetch(likeUrl, likeHeader(accessToken));
    console.log(results);
  }
  