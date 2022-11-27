import {get_all_surveys} from "./surveys/get_all_surveys";
import {get_survey} from "./surveys/get_survey";
import {create} from "./surveys/create";
import {signin, signup} from "./user/signin";

const href = window.location.href;

switch (true) {
    case /surveys/.test(href):
        get_all_surveys();
        break;
    case /survey/.test(href):
        get_survey();
        break;
    case /signin/.test(href):
        signin();
        break;
    case /create/.test(href):
        create();
        break;
    case /signup/.test(href):
        signup();
        break;
}