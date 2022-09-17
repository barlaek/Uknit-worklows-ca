// Functions
import { toggleNav } from "../components/toggleNav.mjs";
import { allPostsFetch } from "../fetch/fetch.mjs";
// DOM
import { postsContainer } from "../constants/constants.mjs";
// Url's
import { baseURL } from "../constants/constants.mjs";
import { allPostsUrl } from "../constants/constants.mjs";
import { createHeaderAllPosts } from "../headers/headers.mjs";

// Function for collapsing nav
toggleNav();

// Collecting accessToken from localStorage
export let accessToken = localStorage.getItem('accessToken');

function createPosts() {
    allPostsFetch(baseURL + allPostsUrl, createHeaderAllPosts(accessToken));
}
createPosts();



