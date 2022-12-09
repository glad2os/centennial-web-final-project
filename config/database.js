const mongoose = require('mongoose');

class config {
    static mongoose;

    static userModel;
    static statisticsModel;

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
        this.mongoose = mongoose;

        this.userModel = mongoose.model('User', userScheme);
        this.statisticsModel = mongoose.model('Statistics', statisticsScheme);
    }
}

module.exports = {
    config
}