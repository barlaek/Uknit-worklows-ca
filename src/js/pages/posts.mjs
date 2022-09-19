// Functions
import { toggleNav } from "../components/toggleNav.mjs";
import { allPostsFetch } from "../fetch/fetch.mjs";
// DOM
import { postContainer } from "../constants/constants.mjs";
import { postTemplate } from "../constants/constants.mjs";
// Url's
import { baseURL } from "../constants/constants.mjs";
import { allPostsUrl } from "../constants/constants.mjs";
import { createHeaderAllPosts } from "../headers/headers.mjs";

// Function for collapsing nav
toggleNav();

// Collecting accessToken from localStorage
export let accessToken = localStorage.getItem('accessToken');

// Function to fetch 
async function createPosts() {
    // Fetch with createHeader function as parameter
    const resultArray = await allPostsFetch(baseURL + allPostsUrl, createHeaderAllPosts(accessToken));
    console.log(resultArray);

    for (let i = 0; i < resultArray.length; i++) {

        const { postText, postCreated, postID, postMedia, postTag, postTitle } = resultArray[i];

        const postClone = document.importNode(postTemplate, true);
        postClone.querySelector("#postAuthor").innerText = `${resultArray[i].author.name}`
        postClone.querySelector("#postTitle").innerText = `${resultArray[i].title}`;
        postClone.querySelector("#postMedia").innerHTML = `<img src="${resultArray[i].media}">`;
        postClone.querySelector("#postText").innerHTML = `${resultArray[i].body}`;
        postClone.querySelector("#postReactionCount").innerHTML = `${resultArray[i]._count.reactions}`

        postContainer.appendChild(postClone);

    }


}
createPosts();




