export async function create() {
    let labelWrapper = document.querySelector('.label-wrapper');
    let questions = document.getElementById('questions');
    let topic = document.getElementById('topic');
    let oldData = Date.now();
    let questionCounter = 0;
    let answerCounter = 0;
    let survey = {
        inquirer: []
    }
    questions.onkeyup = (function (event) {

        if (event.key === "Enter") {
            let eventTime = Date.now();

            if ((eventTime - oldData) / 1000 <= 1.1) {
                console.log(`spam detected: ${(eventTime - oldData) / 1000}`)
                oldData = Date.now();
                return;
            }

            if (isNaN(questions.value) || Number(questions.value) < 1) {
                oldData = Date.now();
                alert(`${questions.value} : is not a number!`);
                return;
            }

            if (topic.value.length < 5) {
                oldData = Date.now();
                alert("Topic value is empty!");
                return;
            }


            questions.disabled = true;
            topic.disabled = true;
            Array.from(document.querySelectorAll('.label-wrapper label')).forEach(value => {
                value.style.color = "#7A7878";
            });
            questionCounter++;
            answerCounter++;

            let questionNameLabel = document.createElement('label');
            questionNameLabel.innerText = `Question #${questionCounter}`;
            let questionNameInput = document.createElement('input');
            questionNameInput.id = `question${questionCounter}`;
            questionNameLabel.insertAdjacentElement('beforeend', questionNameInput);

            let answerNameLabel = document.createElement('label');
            answerNameLabel.innerText = `Answer #${answerCounter}`;
            let answerNameInput = document.createElement('input');
            answerNameInput.id = `answer${answerCounter}`;
            answerNameLabel.insertAdjacentElement('beforeend', answerNameInput);

            let nav = document.createElement('div');
            nav.classList.add('nav');
            let deploy = document.createElement('img');
            let plus = document.createElement('img');
            deploy.src = '/images/deployAnswer.svg';
            plus.src = '/images/addAnswer.svg';
            nav.insertAdjacentElement('afterbegin', deploy);
            nav.insertAdjacentElement('afterbegin', plus);

            plus.onclick = () => {
                answerCounter++;
                let newAnswerLabel = document.createElement('label');
                newAnswerLabel.innerText = `Answer #${answerCounter}`;
                let newAnswerNameInput = document.createElement('input');
                newAnswerNameInput.id = `answer${answerCounter}`;
                newAnswerLabel.insertAdjacentElement('beforeend', newAnswerNameInput);

                labelWrapper.insertBefore(newAnswerLabel, nav);
            }

            deploy.onclick = () => {
                let flag = false;
                if (questionCounter === Number(questions.value)) {
                    flag = true;
                }

                let answers = [];
                for (let i = 1; i <= answerCounter; i++) {
                    let elem = document.getElementById(`answer${i}`);
                    answers.push(elem.value);
                    elem.parentElement.remove()
                }

                survey.inquirer.push({
                    'question': document.getElementById(`question${questionCounter}`).value, 'answers': answers
                });
                answerCounter = 0;

                if(!flag){
                    document.getElementById(`question${questionCounter}`).parentElement.innerHTML = document.getElementById(`question${questionCounter}`).parentElement.innerHTML
                        .replace(`#${questionCounter}`, questionCounter + 1);

                    document.getElementById(`question${questionCounter}`).setAttribute('id', `question${questionCounter + 1}`);
                    questionCounter++;
                    return;
                }

                // TODO: implement sending to the backend
                console.log(survey);
                console.log("sending to the backend");
            }

            labelWrapper.insertAdjacentElement('beforeend', questionNameLabel);
            labelWrapper.insertAdjacentElement('beforeend', answerNameLabel);
            labelWrapper.insertAdjacentElement('beforeend', nav);
        }
    });

}