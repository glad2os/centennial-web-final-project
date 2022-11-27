import {getUserByToken, postData} from "../functions";
import {getCookie} from "../cookies";

async function get_survey() {

    let cookie = getCookie('token');
    const user = await getUserByToken(cookie);

    if (cookie && user.username) {
        let right = document.querySelector('.nav-menu .right');
        right.innerHTML = `<div class="button">${user.username}</div>`
    }

    const data = await postData("/survey/get/" + window.location.pathname.slice('/survey/'.length));
    const response = Array.from(await data.json()).map(value => value._id);

    if (response.error) {
        alert(response.error);
        return;
    }

    function mod(n, m) {
        return ((n % m) + m) % m;
    }

    let current = 0;

    response.forEach(it => {
        const survey = document.createElement('div');
        survey.classList.add("survey");
        survey.id = it._id;

        let surveyQuestion = document.createElement('div');
        surveyQuestion.classList.add('surveyQuestion-wrapper');

        let question = document.createElement('div');
        question.classList.add('question')
        question.innerText = it.question;

        let answers = document.createElement('answers');

        for (const answersKey in it.answers) {
            let answerField = document.createElement('div');
            answerField.classList.add('answerField');

            let radio = document.createElement('input');
            let label = document.createElement('label');
            radio.type = "radio";
            radio.id = `${it._id}|${answersKey}`;
            radio.name = `${it._id}`
            label.setAttribute('for', `${it._id}|${answersKey}`)
            label.innerText = it.answers[answersKey];
            answerField.insertAdjacentElement('beforeend', radio);
            answerField.insertAdjacentElement('beforeend', label);
            answers.insertAdjacentElement('beforeend', answerField);
        }

        surveyQuestion.insertAdjacentElement('beforeend', question);
        surveyQuestion.insertAdjacentElement('beforeend', answers);
        survey.insertAdjacentElement('beforeend', surveyQuestion);

        survey.style.display = 'none';

        let nav = document.createElement('div');
        nav.classList.add('nav');
        let back = document.createElement('div');
        let next = document.createElement('div');
        back.classList.add('back');
        back.innerText = "back";
        next.classList.add('next');
        next.innerText = "next";
        nav.insertAdjacentElement('beforeend', back);
        nav.insertAdjacentElement('beforeend', next);

        back.onclick = () => {
            current--;
            Array.from(document.querySelectorAll('.survey-wrapper>.survey')).forEach(value => value.style.display = 'none')
            let nextIndex = mod(current, response.length + 1);
            let prevQuestion = document.querySelectorAll('.survey-wrapper>.survey')[nextIndex];
            prevQuestion.style.display = 'flex';
            if (Array.from(document.querySelectorAll('.survey-wrapper>.survey')).length - nextIndex === 1) updateSubmitForm();
        }

        next.onclick = () => {
            current++;
            Array.from(document.querySelectorAll('.survey-wrapper>.survey')).forEach(value => value.style.display = 'none')
            let nextIndex = mod(current, response.length + 1);
            let prevQuestion = document.querySelectorAll('.survey-wrapper>.survey')[nextIndex];
            prevQuestion.style.display = 'flex';
            if (Array.from(document.querySelectorAll('.survey-wrapper>.survey')).length - nextIndex === 1) updateSubmitForm();
        }

        function updateSubmitForm() {
            let answers = [];

            const finishSurvey = document.querySelector('#finishSurvey');
            finishSurvey.innerHTML = '';

            Array.from(document.querySelectorAll('input')).filter(it => it.checked).forEach(it => {
                let obj = {
                    question: it.parentNode.parentNode.parentNode.children[0].innerText,
                    answer: it.parentNode.children[1].innerText
                }
                answers.push(obj);
            });

            if (answers.length > 0) {
                answers.forEach(value => {
                    finishSurvey.insertAdjacentHTML('afterbegin', `<div>Question: ${value.question} | answer : ${value.answer}</div>`)
                })
            }
        }

        survey.insertAdjacentElement('beforeend', nav);
        document.querySelector('.survey-wrapper').insertAdjacentElement('afterbegin', survey);
    });

    let finishSurvey = document.createElement('div');
    finishSurvey.classList.add('survey');
    finishSurvey.style.display = 'none';

    let nav = document.createElement('div');
    nav.classList.add('nav');
    let undo = document.createElement('div');
    let submit = document.createElement('div');
    undo.classList.add('button');
    undo.innerText = "UNDO";
    submit.classList.add('button');
    submit.innerText = "SUBMIT";

    nav.insertAdjacentElement('beforeend', undo);
    nav.insertAdjacentElement('beforeend', submit);

    undo.onclick = () => {
        current--;
        Array.from(document.querySelectorAll('.survey-wrapper>.survey')).forEach(value => value.style.display = 'none')
        let prevQuestion = document.querySelectorAll('.survey-wrapper>.survey')[mod(current, response.length + 1)];
        prevQuestion.style.display = 'flex';
    }

    finishSurvey.insertAdjacentHTML('afterbegin', `<div id="finishSurvey"></div>`);
    finishSurvey.insertAdjacentElement('beforeend', nav);

    document.querySelector('.survey-wrapper').insertAdjacentElement('beforeend', finishSurvey);
    document.querySelectorAll('.survey-wrapper>.survey')[0].style.display = 'flex';
}

export {
    get_survey
}