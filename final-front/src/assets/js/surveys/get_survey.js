import {postData} from "../functions";

const surveysWrapper = document.querySelector('.surveys-wrapper');

async function get_survey() {
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
            let prevQuestion = document.querySelectorAll('.survey-wrapper>.survey')[mod(current, response.length)];
            prevQuestion.style.display = 'flex';
        }

        next.onclick = () => {
            current++;
            Array.from(document.querySelectorAll('.survey-wrapper>.survey')).forEach(value => value.style.display = 'none')
            let prevQuestion = document.querySelectorAll('.survey-wrapper>.survey')[mod(current, response.length)];
            prevQuestion.style.display = 'flex';
        }

        survey.insertAdjacentElement('beforeend', nav);

        document.querySelector('.survey-wrapper').insertAdjacentElement('afterbegin', survey);

    });

    document.querySelectorAll('.survey-wrapper>.survey')[0].style.display = 'flex';
}

export {
    get_survey
}