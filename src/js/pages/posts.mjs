// Functions
import { toggleNav } from "../components/toggleNav.mjs";
import { allPostsFetch } from "../fetch/fetch.mjs";
import { createHeaderAllPosts } from "../headers/headers.mjs";
import { userFetch } from "../fetch/fetch.mjs";
import { createHeaderAllUsers } from "../headers/headers.mjs";
// DOM
import { mostPopularTemplate, postContainer } from "../constants/constants.mjs";
import { postTemplate } from "../constants/constants.mjs";
import { mostPopularContainer } from "../constants/constants.mjs";
import { userName } from "../constants/constants.mjs";
// Url's
import { baseURL } from "../constants/constants.mjs";
import { allPostsUrl } from "../constants/constants.mjs";
import { allUsersUrl } from "../constants/constants.mjs";

// Function for collapsing nav
toggleNav();

// Collecting accessToken from localStorage
export let accessToken = localStorage.getItem('accessToken');

// Function to fetch posts
async function createPosts() {
    // Fetch with createHeader function as parameter
    const resultArray = await allPostsFetch(baseURL + allPostsUrl, createHeaderAllPosts(accessToken));
    console.log(resultArray);

    for (let i = 0; i < resultArray.length; i++) {

        // const { postText, postCreated, postID, postMedia, postTag, postTitle } = resultArray[i];

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

// Function to fetch users

async function createUsers() {
    // Fetch with createHeader function as parameter
    const usersArray = await userFetch(baseURL + allUsersUrl, createHeaderAllUsers(accessToken));
    console.log(usersArray);

    for (let i = 0; i < usersArray.length; i++) {

        const userClone = document.importNode(mostPopularTemplate, true);
        userClone.querySelector("#userName").innerText = `${usersArray[i].name}`
        mostPopularContainer.appendChild(userClone);
    }
}
createUsers();
