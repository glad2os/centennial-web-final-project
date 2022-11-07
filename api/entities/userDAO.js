let mongoose = require("mongoose");

class userDAO {
    static of(id, login, password, surveys) {
        return new userDAO(mongoose.Types.ObjectId(id), login, password, surveys);
    }

    constructor(login, password, surveys) {
        this.login = login;
        this.password = password;
        this.surveys = surveys;
    }
}

module.exports = userDAO