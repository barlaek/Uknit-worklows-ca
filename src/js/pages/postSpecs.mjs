import { toggleNav } from "../components/toggleNav.mjs";

import { baseURL, submitPostUrl } from "../constants/constants.mjs";
import { postContainer } from "../constants/constants.mjs";

import { standardFetch } from "../fetch/fetch.mjs";
import { deleteHeader, editProfileBody, standardHeader } from "../headers/headers.mjs";

import { closeModal, modalFunction } from "../components/modals.mjs";
import { insertValueAsPlaceholder } from "../components/editPost.mjs";

import { likeSpecs } from "../components/likeButton.mjs";

// Running functions
toggleNav();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const postSpecUrl =
  baseURL + "api/v1/social/posts/" + id + "?_author=true&_comments=true&_reactions=true";
const postTemplate = document.querySelector("#postSpecsTemplate").content;

async function createPostSpec() {
  const accessToken = localStorage.getItem("accessToken");
  const results = await standardFetch(postSpecUrl, standardHeader(accessToken));
  console.log(results);
  const { title, body, tags, media, id } = results;
  const postClone = document.importNode(postTemplate, true);
  // Reaction count
  const reactionCount = () => {
    if (results.reactions[0]) {
      return results.reactions[0].count;
    } else {
      return 0;
    }
  };
  postClone.querySelector("#postAuthor").innerText = `${results.author.name}`;
  postClone.querySelector("#postTitle").innerText = `${results.title}`;
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
  if (results.author.name === username) {
    postClone.querySelector("#deletePost").classList.remove("d-none");
  }
  postClone.querySelector("#likeButton").addEventListener('click', () => {
    likeSpecs(id, accessToken);
  });
  if (media) {
    postClone.querySelector("#postMedia").innerHTML = `<img src="${results.media}">`;
  }
  else {
    postClone.querySelector("#postMedia").classList.add("d-none");
  }
  postContainer.appendChild(postClone);

  const editButton = document.querySelector("#editPost");
  editButton.addEventListener("click", () => {
    insertValueAsPlaceholder(title, tags, body, media);
    modalFunction();
  });

  document.querySelector("#deletePost").addEventListener("click", () => {
    deletePost();
  });
}
createPostSpec();

document.querySelector("#editPostForm").addEventListener("submit", (event) => {
  editPost(event);
});

async function editPost(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const values = Object.fromEntries(data.entries());
  if (!values.media) {
    delete values.media;
  }
  const accessToken = localStorage.getItem("accessToken");
  const url = baseURL + submitPostUrl + "/" + id;
  await standardFetch(url, editProfileBody(values, accessToken));
  location.reload();
}

async function deletePost() {
  const url = baseURL + submitPostUrl + "/" + id;
  const accessToken = localStorage.getItem("accessToken");
  await standardFetch(url, deleteHeader(accessToken));
  location.href = "../../public/home";
}
