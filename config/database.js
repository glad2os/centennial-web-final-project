const mongoose = require('mongoose');

class config {
    static mongoose;

    static userModel;
    static statisticsModel;
    static cachedStatistics;

    static async initialize() {
        await mongoose.connect(process.env.DB_HOST);

        const userScheme = new mongoose.Schema({
            login: String, password: String, surveys: [{
                _id: mongoose.Schema.ObjectId, topic: String, inquirer: [{
                    _id: mongoose.Schema.ObjectId, question: String, answers: [String]
                }]
            }]
        });

        const statisticsScheme = new mongoose.Schema({
            _inquirerId: mongoose.Schema.ObjectId, inquirerAnswers: Number, _userId: mongoose.Schema.ObjectId
        })

        const cachedStatisticsScheme = new mongoose.Schema({});

        this.mongoose = mongoose;

        this.userModel = mongoose.model('User', userScheme);
        this.statisticsModel = mongoose.model('Statistics', statisticsScheme);
        this.cachedStatistics = mongoose.model('cachedStatistics', cachedStatisticsScheme);
    }
}

module.exports = {
    config
}