import {get_all_surveys} from "./surveys/get_all_surveys";
import {get_survey} from "./surveys/get_survey";

const href = window.location.href;
switch (true) {
    case /surveys/.test(href):
        get_all_surveys();
        break;
    case /survey/.test(href):
        get_survey();
        break;
}