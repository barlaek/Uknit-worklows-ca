// Functions
import { toggleNav } from "../components/toggleNav.mjs";
import { createHeaderAllPosts, standardHeader } from "../headers/headers.mjs";
import { standardFetch } from "../fetch/fetch.mjs";

// search
import { searchUsersInput } from "../constants/constants.mjs";
import { searchPosts } from "../constants/constants.mjs";

// filter
import { sortSelect } from "../constants/constants.mjs";

// DOM
import { postContainer } from "../constants/constants.mjs";
const postTemplate = document.querySelector("#postTemplate").content;
const mostPopularTemplate = document.querySelector("#mostPopularTemplate").content;

// Url's
import { baseURL, allPostsUrl, allUsersUrl } from "../constants/constants.mjs";

// Like
import { like } from "../components/likeButton.mjs";

// Follow
import { follow } from "../components/follow.mjs";

// Running functions
toggleNav();

// Declaring variables
let username;

// Collecting accessToken from localStorage
export let accessToken = localStorage.getItem("accessToken");

/**
 * Function that adds variable containing sorting url to params of createPosts function.
 */
function runSort() {
  sortSelect.addEventListener("change", () => {
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
  });
}
runSort();

/**
 * Function to fetch posts and build them on page.
 * @param {string} sortUrl Additional string for url in fetch if sorting is applied. If not, variable is empty.
 */
async function createPosts(sortUrl = "") {
  // Fetch with createHeader function as parameter
  const resultArray = await standardFetch(baseURL + allPostsUrl + sortUrl, createHeaderAllPosts(accessToken));
  for (let i = 0; i < resultArray.length; i++) {
    // Destructuring each result from loop
    const { author: { name }, author: { avatar }, body, title, media, id, _count: { comments } } = resultArray[i];
    /**
     * Checks the amount of reactions(likes) on a post
     * @returns the amount of likes if > 0, otherwise returns 0
     */
    const reactionCount = () => {
      if (resultArray[i].reactions[0]) {
        return resultArray[i].reactions[0].count;
      } else {
        return 0;
      }
    };

    const postClone = document.importNode(postTemplate, true);
    postClone.querySelector("#postAuthor").innerText = `${name}`;
    postClone.querySelector("#postTitle").innerText = `${title}`;

    if (media) {
      postClone.querySelector("#postMedia").innerHTML = `<img src="${media}">`;
    }
    else {
      postClone.querySelector("#postMedia").classList.add("d-none");
    }
    postClone.querySelector("#postText").innerHTML = `${body}`;
    postClone.querySelector("#postReactionCount").innerHTML = `${reactionCount()}`;
    postClone.querySelector("#postAvatar").innerHTML = `<img src="${avatar}">`;
    postClone.querySelector("#viewPostButton").innerHTML = `<a href="../post-specs/post-specs.html?id=${id}" class="btn btn-small-primary">View Post</a>`;
    postClone.querySelector("#commentCount").innerHTML = `${comments}`;
    postClone.querySelector("#likeButton").addEventListener('click', () => {
      like(resultArray, i, accessToken);
    });

    username = localStorage.getItem("username");
    if (resultArray[i].author.name === username) {
      postClone.querySelector("#followDiv").classList.add("d-none");
    }
    else {
      postClone.querySelector("#followDiv").addEventListener("click", () => {
        follow(resultArray, i, accessToken);
      })
    }
    postContainer.appendChild(postClone);
  }


  /**
   * Function for searching posts
   */
  function postsSearch() {
    searchPosts.addEventListener("keyup", (event) => {
      const inputValue = event.target.value.toLowerCase();
      const filteredPosts = resultArray.filter((resultArray) => {
        if (resultArray.title.toLowerCase().includes(inputValue) || resultArray.author.name.toLowerCase().includes(inputValue)) {
          postContainer.innerHTML = "";
          return resultArray;
        }
      });
      for (let i = 0; i < filteredPosts.length; i++) {
        // Destructuring result objects
        const { author: { name }, author: { avatar }, body, title, media, id, _count: { comments } } = filteredPosts[i];
        const postClone = document.importNode(postTemplate, true);
        postClone.querySelector("#postAuthor").innerText = `${name}`;
        postClone.querySelector("#postTitle").innerText = `${title}`;
        postClone.querySelector("#postMedia").innerHTML = `<img src="${media}">`;
        postClone.querySelector("#postText").innerHTML = `${body}`;
        postClone.querySelector("#postReactionCount").innerHTML = `${filteredPosts[i]._count.reactions}`;
        postClone.querySelector("#postAvatar").innerHTML = `<img src="${avatar}">`;
        postClone.querySelector("#commentCount").innerHTML = `${comments}`;
        postClone.querySelector("#viewPostButton").innerHTML = `<a href="../post-specs/post-specs.html?id=${id}" class="btn btn-small-primary">View Post</a>`;
        if (filteredPosts[i].author.name === username) {
          postClone.querySelector("#followDiv").classList.add("d-none");
        }
        postContainer.appendChild(postClone);
      }
    });
  }
  postsSearch();
}
createPosts();

/**
 * Function to build usersArray and create div from each user
 */
async function createUsers() {
  // Fetch with createHeader function as parameter
  const usersArray = await standardFetch(baseURL + allUsersUrl, standardHeader(accessToken));

  for (let i = 0; i < usersArray.length; i++) {
    const userClone = document.importNode(mostPopularTemplate, true);
    userClone.querySelector("#userName").innerText = `${usersArray[i].name}`;
    mostPopularContainer.appendChild(userClone);
  }
  // search users
  searchUsersInput.addEventListener("keyup", (event) => {
    const inputValue = event.target.value.toLowerCase();
    const filteredArray = usersArray.filter((usersArray) => {
      if (usersArray.name.toLowerCase().startsWith(inputValue)) {
        mostPopularContainer.innerHTML = "";
        return usersArray;
      }
    });

    for (let i = 0; i < filteredArray.length; i++) {
      const userClone = document.importNode(mostPopularTemplate, true);
      userClone.querySelector("#userName").innerText = `${filteredArray[i].name}`;
      mostPopularContainer.appendChild(userClone);
    }
  });
}
createUsers();






