const mongoose = require('mongoose');

class config {
    static mongoose;

    static userModel;
    static statisticsModel;

    static async initialize() {
        await mongoose.connect(process.env.DB_HOST);

        const userScheme = new mongoose.Schema({
            login: String, password: String, surveys: [{
                _id: mongoose.Schema.ObjectId, question: String, answers: [[String]]
            }]
        });

        const statisticsScheme = new mongoose.Schema({
            _userId: mongoose.Schema.ObjectId, surveys: [{
                _surveyId: mongoose.Schema.ObjectId, surveyAnswers: [[Number]]
            }]
        });

        // todo: implement to the Statistics CRUD
        // creating a new statistics with specified survey
        // await mongoose.model('Statistics', statisticsScheme).collection.insertOne({
        //     _userId: mongoose.Types.ObjectId("636850354833b74ace341088"),
        //     surveys: [
        //         {
        //             _surveyId: mongoose.Types.ObjectId("636850354833b74ace341086"),
        //             surveyAnswers: [2,3]
        //         }
        //     ]
        // })

        this.mongoose = mongoose;

        this.userModel = mongoose.model('User', userScheme);
        this.statisticsModel = mongoose.model('Statistics', statisticsScheme);
    }
}

module.exports = {
    config
}