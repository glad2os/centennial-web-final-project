import {postData, getUserByToken} from "../functions";
import {getCookie} from "../cookies";

const surveysWrapper = document.querySelector('.surveys-wrapper');

async function get_all_surveys() {


    const data = await postData("/survey/getall");
    const response = await data.json();

    response.forEach(it => {
        let surveyData = {
            _id: it._id,
            topic: it.topic[0].substring(0, 281)
        }

        let survey = document.createElement('div');
        survey.classList.add('survey');
        survey.onclick = (ev) => {
            if (ev.target.classList.contains('survey')
                || ev.target.classList.contains('title')
                || ev.target.classList.contains('comments')) window.location.href = `/survey/${surveyData._id}`;
            else console.log(ev.target)
        }
        let title = document.createElement('div');
        title.classList.add('title');
        title.innerText = surveyData.topic;
        let comments = document.createElement('div');
        comments.classList.add('comments');
        let remove = document.createElement('div');
        remove.classList.add('remove');
        let like = document.createElement('div');
        like.classList.add('like');

        remove.onclick = (ev) => {
            askForRemove(surveyData._id, survey);
        }
        comments.insertAdjacentElement('beforeend', like);
        comments.insertAdjacentElement('beforeend', remove);

        survey.insertAdjacentElement('beforeend', title);
        survey.insertAdjacentElement('beforeend', comments);
        surveysWrapper.insertAdjacentElement('beforeend', survey);
    });
}

async function askForRemove(id, target) {
    let removeAsk = prompt(`To remove ${id} one please type remove`, "");
    if (removeAsk === "remove") {
        const req = await postData(`/survey/remove/${id}`, {
            "token": localStorage.getItem('token')
        });
        const res = await req.json();

        if (res.error) {
            alert(res.error);
            return;
        }
        if (res.modifiedCount) {
            target.remove();
            alert('done!')
        }
    }
}

export {
    get_all_surveys
}