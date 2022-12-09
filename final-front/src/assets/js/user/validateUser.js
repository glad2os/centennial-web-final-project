import {setCookie} from "../cookies";
import {getUserByToken} from "../functions";

export default async function validateUser() {
    if (localStorage.token) {
        setCookie('token', localStorage.token);
        const user = await getUserByToken(localStorage.token);

        if (user.username) {
            let right = document.querySelector('.nav-menu .right');
            right.innerHTML = `<div class="button">${user.username}</div>`
        } else if (user.error) {
            localStorage.removeItem('token');
            setCookie('token', '');
        }
    }
}