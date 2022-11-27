import {postData} from "../functions";
import {getCookie, setCookie} from "../cookies";

export async function signup() {

}

export async function signin() {
    let login = document.getElementById('login');
    let password = document.getElementById('password');
    let submit = document.getElementById('submit');


    submit.onclick = async () => {
        if (login.value.length < 4 || login.value.length < 4) {
            alert("Data length < 4");
            return;
        }

        const data = await postData('/users/login', {"login": login.value, "password": password.value});
        const json = await data.json();

        if (json.error) {
            alert(json.error);
        }

        if (json.token) {
            setCookie('token', json.token);
            localStorage.setItem('token', json.token);
            window.location = '/'
        }
    }
}