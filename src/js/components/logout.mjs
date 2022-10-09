import { logoutButton } from "../constants/constants.mjs";

/**
 * Logs out user by removing accessToken, username and avatar from local storage
 */
export function logOut() {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        localStorage.removeItem('userAvatarImage');
        location.href = "../../../public/";
    })
}