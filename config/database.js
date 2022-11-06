const mongoose = require('mongoose');

class config {
    static mongoose;

    static userModel;
    static statisticsModel;

    static async initialize() {
        await mongoose.connect(process.env.DB_HOST);

        const userScheme = new mongoose.Schema({
            login: String, password: String, surveys: [{
                question: String, answers: [{
                    text: String
                }]
            }]
        });

        const statisticsScheme = new mongoose.Schema({
            userID: mongoose.Types.ObjectId(),
            surveyAnswers : [{
                surveyId: mongoose.Types.ObjectId(),
                answers: [
                    {
                        questionId: mongoose.Types.ObjectId(),
                        answerId: mongoose.Types.ObjectId()
                    }
                ]
            }]
        });

        this.mongoose = mongoose;

        this.userModel = mongoose.model('User', userScheme);
        this.statisticsModel = mongoose.model('Statistics', statisticsScheme);
    }
}

module.exports = {
    config
}