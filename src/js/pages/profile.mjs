// functions
import { dashBoard } from "../components/dashboardNavToggle.mjs";
import { toggleNav } from "../components/toggleNav.mjs";
import { standardHeader } from "../headers/headers.mjs";
import { standardFetch } from "../fetch/fetch.mjs";
import { createHeaderAllPosts } from "../headers/headers.mjs";
import { logOut } from "../components/logout.mjs";
logOut();
dashBoard();
toggleNav();

// Url's
import { baseURL, profileUrl, profileExtUrl, allPostsUrl } from "../constants/constants.mjs";

// DOM
import { profileUsername, followerCount, followingCount, avatarImageWrap, postContainer } from "../constants/constants.mjs";
const postTemplate = document.querySelector('#postTemplate').content;

// modals
import { modalListeners, openModal, closeModal } from "../components/modals.mjs";
import { editProfileBody } from "../headers/headers.mjs";
modalListeners(openModal, closeModal);


// Declaring variable to use it later with collected value
let accessToken;
let username;

/**
 * Creates profile using fetch and local storage. If user does not have a profile image, profile image is set as a stock icon.
 */
async function createProfile() {
    username = localStorage.getItem('username');
    accessToken = localStorage.getItem('accessToken');
    // Fetch with createHeader function as parameter
    const profileData = await standardFetch(baseURL + profileUrl + username + profileExtUrl, standardHeader(accessToken));
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

/**
 * Displays the user´s own posts using a fetch with results filtered by username. 
 */
async function createPosts() {
    // Fetch with createHeader function as parameter
    const resultArray = await standardFetch(baseURL + allPostsUrl, createHeaderAllPosts(accessToken));
    const ownPostsArray = resultArray.filter((resultArray) => {
        return resultArray.author.name === username;
    });

    console.log(ownPostsArray);
    for (let i = 0; i < ownPostsArray.length; i++) {

        const { author: { name }, author: { avatar }, body, title, media, id, _count: { comments } } = ownPostsArray[i];

        const reactionCount = () => {
            if (ownPostsArray[i].reactions[0]) {
                return ownPostsArray[i].reactions[0].count;
            }
            else {
                return 0;
            }
        }

        const postClone = document.importNode(postTemplate, true);
        postClone.querySelector("#postAuthor").innerText = `${name}`;
        postClone.querySelector("#postTitle").innerText = `${title}`;
        if (media) {
            postClone.querySelector("#postMedia").innerHTML = `<img src="${media}">`;
        } else {
            postClone.querySelector("#postMedia").classList.add("d-none");
        }
        postClone.querySelector("#postText").innerHTML = `${body}`;
        postClone.querySelector("#postReactionCount").innerHTML = `${reactionCount()}`;
        postClone.querySelector("#postAvatar").innerHTML = `<img src="${avatar}">`;
        postClone.querySelector("#viewPostButton").innerHTML = `<a href="/public/post-specs/post-specs.html?id=${id}" class="btn btn-small-primary">View Post</a>`;

        if (ownPostsArray[i].author.name === username) {
            postClone.querySelector('#followDiv').classList.add("d-none");
        }

        postContainer.appendChild(postClone);
    }
}
createPosts();



const editProfileForm = document.querySelector('#editProfileForm');

/**
 * Fetch to change avatar image on submit event of form
 */
editProfileForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    const name = localStorage.getItem("username");
    const accessToken = localStorage.getItem("accessToken");
    await standardFetch(baseURL + `api/v1/social/profiles/${name}/media`, editProfileBody(values, accessToken));
    // localStorage.setItem('userAvatarImage', userAvatarImage);
    location.reload();
})

