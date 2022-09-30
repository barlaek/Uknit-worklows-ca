import { logoutButton } from "../constants/constants.mjs";

export function logOut() {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        localStorage.removeItem('userAvatarImage');
        location.href = "../../profile/log-in/index.html";
    })
}