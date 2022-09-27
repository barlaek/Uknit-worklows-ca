// functions
import { dashBoard } from "../components/dashboardNavToggle.mjs";
import { toggleNav } from "../components/toggleNav.mjs";
import { createProfileHeader } from "../headers/headers.mjs";
import { standardFetch } from "../fetch/fetch.mjs";
dashBoard();
toggleNav();

// Url's
import { baseURL, profileUrl, profileExtUrl } from "../constants/constants.mjs";

// DOM
import { profileUsername, followerCount, followingCount, avatarImageWrap } from "../constants/constants.mjs";

async function createProfile() {
    const username = localStorage.getItem('username');
    const accessToken = localStorage.getItem('accessToken');
    // Fetch with createHeader function as parameter
    const profileData = await standardFetch(baseURL + profileUrl + username + profileExtUrl, createProfileHeader(accessToken));
    profileUsername.innerText = profileData.name;
    followerCount.innerText = profileData._count.followers;
    followingCount.innerText = profileData._count.following;

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
    userAvatarImage = results.avatar;
    createProfile();
})

