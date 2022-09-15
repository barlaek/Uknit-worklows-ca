// Functions
import { toggleNav } from "../components/toggleNav.mjs";
// DOM
import { postsContainer } from "../constants/constants.mjs";
// Url's
import { baseURL } from "../constants/constants.mjs";
import { allPostsUrl } from "../constants/constants.mjs";

// Function for collapsing nav
toggleNav();

// Collecting accessToken from localStorage
export let accessToken = localStorage.getItem('accessToken');




