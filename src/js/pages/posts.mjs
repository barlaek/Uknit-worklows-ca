// Functions
import { toggleNav } from "../components/toggleNav.mjs";
import { allPostsFetch } from "../fetch/fetch.mjs";
import { createHeaderAllPosts } from "../headers/headers.mjs";
import { userFetch } from "../fetch/fetch.mjs";
import { createHeaderAllUsers } from "../headers/headers.mjs";

// search
import { searchUsersInput } from "../constants/constants.mjs";
import { searchPosts } from "../constants/constants.mjs";

// filter
import { sortSelect } from "../constants/constants.mjs";

// DOM
import { postContainer } from "../constants/constants.mjs";
const postTemplate = document.querySelector('#postTemplate').content;
const mostPopularTemplate = document.querySelector('#mostPopularTemplate').content;
import { likeButton } from "../constants/constants.mjs";

// Url's
import { baseURL } from "../constants/constants.mjs";
import { allPostsUrl } from "../constants/constants.mjs";
import { allUsersUrl } from "../constants/constants.mjs";

// Function for collapsing nav
toggleNav();

// Collecting accessToken from localStorage
export let accessToken = localStorage.getItem('accessToken');

// Sorting
function runSort() {
    sortSelect.addEventListener('change', () => {
        switch (sortSelect.value) {
            case "new":
                const createdDesc = "&sort=created&sortOrder=desc";
                postContainer.innerHTML = "";
                createPosts(createdDesc);
                break;
            case "old":
                const createdAsc = "&sort=created&sortOrder=asc";
                postContainer.innerHTML = "";
                createPosts(createdAsc);
                break;
        }
    })
}
runSort();

// Function to fetch posts
async function createPosts(sortUrl) {
    // Fetch with createHeader function as parameter
    const resultArray = await allPostsFetch(baseURL + allPostsUrl + sortUrl, createHeaderAllPosts(accessToken));

    for (let i = 0; i < resultArray.length; i++) {

        // const { postText, postCreated, postID, postMedia, postTag, postTitle } = resultArray[i];

        const postClone = document.importNode(postTemplate, true);
        postClone.querySelector("#postAuthor").innerText = `${resultArray[i].author.name}`
        postClone.querySelector("#postTitle").innerText = `${resultArray[i].title}`;
        postClone.querySelector("#postMedia").innerHTML = `<img src="${resultArray[i].media}">`;
        postClone.querySelector("#postText").innerHTML = `${resultArray[i].body}`;
        postClone.querySelector("#postReactionCount").innerHTML = `${resultArray[i]._count.reactions}`
        postClone.querySelector("#postAvatar").innerHTML = `<img src="${resultArray[i].author.avatar}">`
        postContainer.appendChild(postClone);
    }

    // Search
    function postsSearch() {
        searchPosts.addEventListener('keyup', (event) => {
            const inputValue = event.target.value.toLowerCase();
            const filteredPosts = resultArray.filter((resultArray) => {
                if (resultArray.title.toLowerCase().startsWith(inputValue) || resultArray.author.name.toLowerCase().startsWith(inputValue)) {
                    postContainer.innerHTML = "";
                    return resultArray;
                }
            });
            for (let i = 0; i < filteredPosts.length; i++) {

                const postClone = document.importNode(postTemplate, true);
                postClone.querySelector("#postAuthor").innerText = `${filteredPosts[i].author.name}`
                postClone.querySelector("#postTitle").innerText = `${filteredPosts[i].title}`;
                postClone.querySelector("#postMedia").innerHTML = `<img src="${filteredPosts[i].media}">`;
                postClone.querySelector("#postText").innerHTML = `${filteredPosts[i].body}`;
                postClone.querySelector("#postReactionCount").innerHTML = `${filteredPosts[i]._count.reactions}`
                postClone.querySelector("#postAvatar").innerHTML = `<img src="${filteredPosts[i].author.avatar}">`
                postContainer.appendChild(postClone);
            }
        })
    }
    postsSearch();
}
createPosts();

// Function to fetch users
async function createUsers() {
    // Fetch with createHeader function as parameter
    const usersArray = await userFetch(baseURL + allUsersUrl, createHeaderAllUsers(accessToken));

    for (let i = 0; i < usersArray.length; i++) {

        const userClone = document.importNode(mostPopularTemplate, true);
        userClone.querySelector("#userName").innerText = `${usersArray[i].name}`
        mostPopularContainer.appendChild(userClone);
    }
    // search users
    searchUsersInput.addEventListener('keyup', (event) => {
        const inputValue = event.target.value.toLowerCase();
        const filteredArray = usersArray.filter((usersArray) => {
            if (usersArray.name.toLowerCase().startsWith(inputValue)) {
                mostPopularContainer.innerHTML = "";
                return usersArray;
            }
        });

        for (let i = 0; i < filteredArray.length; i++) {

            const userClone = document.importNode(mostPopularTemplate, true);
            userClone.querySelector("#userName").innerText = `${filteredArray[i].name}`
            mostPopularContainer.appendChild(userClone);
        }
    })
}
createUsers();