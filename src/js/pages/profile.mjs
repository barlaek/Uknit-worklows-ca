// functions
import { dashBoard } from "../components/dashboardNavToggle.mjs";
import { toggleNav } from "../components/toggleNav.mjs";
import { createProfileHeader } from "../headers/headers.mjs";
import { standardFetch } from "../fetch/fetch.mjs";
dashBoard();
toggleNav();

// Url's
import { baseURL } from "../constants/constants.mjs";
import { profileUrl } from "../constants/constants.mjs";
import { profileExtUrl } from "../constants/constants.mjs";

// DOM
import { profileUsername } from "../constants/constants.mjs";
import { followerCount } from "../constants/constants.mjs";
import { followingCount } from "../constants/constants.mjs";

async function createProfile() {
    const username = localStorage.getItem('username');
    const accessToken = localStorage.getItem('accessToken');
    // Fetch with createHeader function as parameter
    const profileData = await standardFetch(baseURL + profileUrl + username + profileExtUrl, createProfileHeader(accessToken));
    console.log(profileData);
    profileUsername.innerText = profileData.name;
    followerCount.innerText = profileData._count.followers;
    followingCount.innerText = profileData._count.following;
}
createProfile();