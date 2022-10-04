import { baseURL } from "../constants/constants.mjs";
import { postContainer } from "../constants/constants.mjs";

import { standardFetch } from "../fetch/fetch.mjs";
import { standardHeader } from "../headers/headers.mjs";

import { closeModal, modalFunction } from "../components/modals.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id")

const postSpecUrl = baseURL + "api/v1/social/posts/" + id + "?_author=true&_comments=true&_reactions=true";
const postTemplate = document.querySelector('#postTemplate').content;

async function createPostSpec() {
    const accessToken = localStorage.getItem('accessToken');
    const results = await standardFetch(postSpecUrl, standardHeader(accessToken))
    const postClone = document.importNode(postTemplate, true);
    // Reaction count
    const reactionCount = () => {
        if (results.reactions[0]) {
            return results.reactions[0].count;
        }
        else {
            return 0;
        }
    }
    postClone.querySelector("#postAuthor").innerText = `${results.author.name}`;
    postClone.querySelector("#postTitle").innerText = `${results.title}`;
    postClone.querySelector("#postMedia").innerHTML = `<img src="${results.media}">`;
    postClone.querySelector("#postText").innerHTML = `${results.body}`;
    postClone.querySelector("#postReactionCount").innerHTML = `${reactionCount()}`;
    postClone.querySelector("#postAvatar").innerHTML = `<img src="${results.author.avatar}">`;
    const username = localStorage.getItem("username");
    if (results.author.name === username) {
      postClone.querySelector("#editPost").classList.remove("d-none");
    }
    if (results.author.name === username) {
      postClone.querySelector("#followDiv").classList.add("d-none");
    }
    postContainer.appendChild(postClone);

    const editButton = document.querySelector("#editPost");
    editButton.addEventListener('click', () => {
        modalFunction();
    })
    
}
createPostSpec();

