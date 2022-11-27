import {postData, getUserByToken} from "../functions";
import {getCookie} from "../cookies";

const surveysWrapper = document.querySelector('.surveys-wrapper');

async function get_all_surveys() {
    let cookie = getCookie('token');
    const user = await getUserByToken(cookie);

    if (cookie && user.username) {
        let right = document.querySelector('.nav-menu .right');
        right.innerHTML = `<div class="button">${user.username}</div>`
    }

    const data = await postData("/survey/getall");
    const response = await data.json();

    response.forEach(it => {
        let surveyData = {
            _id: it._id,
            topic: it.topic[0].substring(0, 281)
        }

        let survey = document.createElement('div');
        survey.classList.add('survey');
        survey.onclick = () => window.location.href = `/survey/${surveyData._id}`;
        let title = document.createElement('div');
        title.classList.add('title');
        title.innerText = surveyData.topic;
        let comments = document.createElement('div');
        comments.classList.add('comments');
        let like = document.createElement('div');
        like.classList.add('like');
        let dislike = document.createElement('div');
        dislike.classList.add('dislike');

        comments.insertAdjacentElement('beforeend', dislike);
        comments.insertAdjacentElement('beforeend', like);

        survey.insertAdjacentElement('beforeend', title);
        survey.insertAdjacentElement('beforeend', comments);
        surveysWrapper.insertAdjacentElement('beforeend', survey);
    });
}

export {
    get_all_surveys
}