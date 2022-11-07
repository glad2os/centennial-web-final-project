let mongoose = require("mongoose");

class statisticsDAO {
    static of(_userId, surveys) {
        return new statisticsDAO(mongoose.Types.ObjectId(_userId), surveys);
    }

    constructor(_userId, surveys) {
        this.login = _userId;
        this.surveys = surveys;
    }
}

module.exports = statisticsDAO