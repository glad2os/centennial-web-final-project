import {postData} from "../functions";
import {setCookie} from "../cookies";

export async function signup() {
    let login = document.getElementById('login');
    let password = document.getElementById('password');
    let submit = document.getElementById('submit');

    submit.onclick = async () => {
        if (login.value.length < 4 || login.value.length < 4) {
            alert("Data length < 4");
            return;
        }

        const data = await postData('/users/register', {"login": login.value, "password": password.value});

        if (data.status === 200) {
            window.location = '/signin'
        } else {
            alert("Not able to create an account")
        }
    }
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