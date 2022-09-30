// functions
import { dashBoard } from "../components/dashboardNavToggle.mjs";
import { toggleNav } from "../components/toggleNav.mjs";
import { createProfileHeader } from "../headers/headers.mjs";
import { standardFetch } from "../fetch/fetch.mjs";
import { createHeaderAllPosts } from "../headers/headers.mjs";
import {logOut} from "../components/logout.mjs";
logOut();
dashBoard();
toggleNav();

// Url's
import { baseURL, profileUrl, profileExtUrl, allPostsUrl } from "../constants/constants.mjs";

// DOM
import { profileUsername, followerCount, followingCount, avatarImageWrap, postContainer } from "../constants/constants.mjs";
const postTemplate = document.querySelector('#postTemplate').content;

// Declaring variable to use it later with collected value
let accessToken;
let username;

async function createProfile() {
    username = localStorage.getItem('username');
    accessToken = localStorage.getItem('accessToken');
    // Fetch with createHeader function as parameter
    const profileData = await standardFetch(baseURL + profileUrl + username + profileExtUrl, createProfileHeader(accessToken));
    profileUsername.innerText = profileData.name;
    followerCount.innerText = profileData._count.followers;
    followingCount.innerText = profileData._count.following;

    // 
    function buildAvatar() {
        if (profileData.avatar) {
            return profileData.avatar;
        }
        else {
            return "/src/assets/profile-icon.svg";
        }
    }

    avatarImageWrap.innerHTML = `<img src="${buildAvatar()}" alt=""/>`;
}
createProfile();

// modals
import { modalListeners, openModal, closeModal } from "../components/modals.mjs";
import { editProfileBody } from "../headers/headers.mjs";
modalListeners(openModal, closeModal);

const editProfileForm = document.querySelector('#editProfileForm');

editProfileForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    const name = localStorage.getItem("username");
    const accessToken = localStorage.getItem("accessToken");
    const results = await standardFetch(baseURL + `api/v1/social/profiles/${name}/media`, editProfileBody(values, accessToken));
    let userAvatarImage = results.avatar;
    // localStorage.setItem('userAvatarImage', userAvatarImage);
    location.reload();
})

// Fetching user posts 
async function createPosts() {
    // Fetch with createHeader function as parameter
    const resultArray = await standardFetch(baseURL + allPostsUrl, createHeaderAllPosts(accessToken));
    console.log(resultArray);
    const ownPostsArray = resultArray.filter((resultArray) => {
        return resultArray.author.name === username;
    });

    for (let i = 0; i < ownPostsArray.length; i++) {
        // const { postText, postCreated, postID, postMedia, postTag, postTitle } = resultArray[i];

        const reactionCount = () => {
            if (ownPostsArray[i].reactions[0]) {
                return ownPostsArray[i].reactions[0].count;
            }
            else {
                return 0;
            }
        }

        const postClone = document.importNode(postTemplate, true);
        postClone.querySelector("#postAuthor").innerText = `${ownPostsArray[i].author.name}`;
        postClone.querySelector("#postTitle").innerText = `${ownPostsArray[i].title}`;
        postClone.querySelector("#postMedia").innerHTML = `<img src="${ownPostsArray[i].media}">`;
        postClone.querySelector("#postText").innerHTML = `${ownPostsArray[i].body}`;
        postClone.querySelector("#postReactionCount").innerHTML = `${reactionCount()}`;
        postClone.querySelector("#postAvatar").innerHTML = `<img src="${ownPostsArray[i].author.avatar}">`;
        postClone.querySelector("#viewPostButton").innerHTML = `<a href="/public/post-specs/post-specs.html?id=${ownPostsArray[i].id}" class="btn btn-small-primary">View Post</a>`;
        postClone.querySelector("#editPost").classList.remove("d-none");
        postContainer.appendChild(postClone);
    }
}
createPosts();