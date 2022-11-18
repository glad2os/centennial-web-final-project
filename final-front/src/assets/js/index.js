import {get_all_surveys} from "./surveys/get_all_surveys";

switch (window.location.pathname) {
    case "/surveys":
        get_all_surveys();
        break;
}