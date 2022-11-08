let mongoose = require("mongoose");

class userDAO {
    static of(login, password, surveys = null) {
        return new userDAO(login, password, surveys);
    }

    constructor(login, password, surveys) {
        this.login = login;
        this.password = password;
        this.surveys = surveys;
    }
}

module.exports = userDAO