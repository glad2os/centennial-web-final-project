import {postData} from "../functions";

const surveysWrapper = document.querySelector('.surveys-wrapper');

async function get_all_surveys() {
    const data = await postData("/survey/getall");
    const response = await data.json();

    response.forEach(it => {
        let survey = {
            _id: it._id,
            topic: it.topic[0].substring(0, 281)
        }

        // 281 max
        surveysWrapper.insertAdjacentHTML('beforeend', ` <div class="survey" id="">
            <div class="title">${survey.topic}</div>
            <div class="comments">
                <div class="dislike"></div>
                <div class="like"></div>
            </div>
        </div>`);

    })
}

export {
    get_all_surveys
}