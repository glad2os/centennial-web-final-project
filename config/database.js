const mongoose = require('mongoose');

class config {
    static mongoose;

    static userModel;

    static async initialize() {
        await mongoose.connect(process.env.DB_HOST);

        const userScheme = new mongoose.Schema({
            login: String, password: String, surveys: [{
                _id: mongoose.Schema.ObjectId, question: String, answers: [String]
            }], statistics: [
                {
                    _surveyId: mongoose.Schema.ObjectId, surveyAnswers: [Number]
                }
            ]
        });

        this.mongoose = mongoose;

        this.userModel = mongoose.model('User', userScheme);
    }
}

module.exports = {
    config
}