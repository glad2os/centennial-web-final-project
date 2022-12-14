import {getUserByToken, postData} from "../functions";

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

    const statistics = await postData("/statistics/info",{});
    let statisticsJSONArray = await statistics.json();
    let statisticsJSON = statisticsJSONArray[0];
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

            if(statisticsJSON && statisticsJSON.answers){
                let statisticsObj = statisticsJSON.answers.find(id=> id.id === it._id)
                if(statisticsObj !== undefined){
                    let findStat = statisticsObj.statistics.find(it => it.id === Number(answersKey));
                    if(findStat && findStat.count){
                        label.innerText += ` (TOTAL: ${findStat.count})`;
                    }
                }
            }

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
        let update = document.createElement('div');
        back.classList.add('back');
        back.innerText = "back";
        update.classList.add('update');
        update.innerText = "update";
        next.classList.add('next');
        next.innerText = "next";
        nav.insertAdjacentElement('beforeend', back);
        nav.insertAdjacentElement('beforeend', update);
        nav.insertAdjacentElement('beforeend', next);

        back.onclick = () => {
            current--;
            Array.from(document.querySelectorAll('.survey-wrapper>.survey')).forEach(value => value.style.display = 'none')
            let nextIndex = mod(current, response.length + 1);
            let prevQuestion = document.querySelectorAll('.survey-wrapper>.survey')[nextIndex];
            prevQuestion.style.display = 'flex';
            if (Array.from(document.querySelectorAll('.survey-wrapper>.survey')).length - nextIndex === 1) updateSubmitForm();
        }

        update.onclick = () => {
            let surveyId = window.location.pathname.slice('/survey/'.length);
            window.location = `/update/${surveyId}/${it._id}`;
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

    submit.onclick = async () => {
        let answersObj = [];

        Array.from(document.querySelectorAll('input')).filter(it => it.checked).forEach(it => {
            let obj = {
                inquirerAnswers: it.parentNode.children[1].getAttribute('for').split("|")[1],
                inquirerId: it.parentNode.children[1].getAttribute('for').split("|")[0]
            }
            answersObj.push(obj);
        });

        if (answersObj.length == 0) {
            alert("Answers are empty!");
            return;
        }

        let sendingJson = {};

        if (localStorage.getItem('token')) {
            const user = await getUserByToken(localStorage.getItem('token'));
            if (user.id)
                sendingJson.userId = user.id
        }

        sendingJson.data = answersObj;
        let responsePromise = await postData('/survey/answer', sendingJson);
        let r = await responsePromise.json();

        if (r.error) {
            alert(r.error);
        } else {
            alert("done!");
            console.log(r);
        }
    }

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