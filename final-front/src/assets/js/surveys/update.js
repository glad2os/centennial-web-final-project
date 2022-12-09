import {postData} from "../functions";

export async function update() {
    let textarea = document.querySelector('textarea');
    let href = window.location.pathname.split('/').filter(it => it.length === 24);

    const surveyId = href[0];
    const inquirerId = href[1];
    if (!surveyId || !inquirerId) {
        alert("incorrect data!");
        return;
    }

    let dataObj = {};

    let inquirerData = await postData(`/survey/inquirer/${inquirerId}`);
    let inquirerResponse = await inquirerData.json();
    console.log(inquirerResponse[0]);
    dataObj.answers = inquirerResponse[0]._id.answers;
    dataObj.question = inquirerResponse[0]._id.question;
    textarea.innerText = JSON.stringify(dataObj);

    let flag = true;
    textarea.onkeyup = (async function (event) {
        if (event.key === "Enter" && !event.shiftKey && flag) {
            flag = false;

            let updatePrompt = prompt(`To update ${inquirerId} one please type update`, "");
            if (updatePrompt === 'update') {
                try {
                    let data = JSON.parse(textarea.value);

                    if (localStorage.getItem('token') === null) {
                        throw "please sign in!";
                    }

                    let updatePromise = await postData(`/survey/get/${surveyId}/update/inquirer/${inquirerId}`, {
                        "token": localStorage.getItem('token'), "inquirer": data});
                    let jsonResponsePromise = await updatePromise.json();

                    if (jsonResponsePromise.error) {
                        alert(jsonResponsePromise.error)
                    }

                    if (jsonResponsePromise.modifiedCount) {
                        alert(`Done! Updated: ${jsonResponsePromise.modifiedCount}`);
                    }
                } catch (e) {
                    alert(e);
                }
            } else {
                flag = true;
            }
        }
    });
}