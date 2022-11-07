const {config} = require("../config/database");
const {mongoose} = require("mongoose");

async function createSurvey(userid, survey) {
    return await config.userModel.collection.updateOne({_id: mongoose.Types.ObjectId(userid)}, {
        $push: {
            "surveys": {
                "_id": new mongoose.Types.ObjectId(), survey
            }
        }
    }, {multi: true});
}

async function getSurveyBySurveyId(surveyId) {
    return config.userModel.aggregate([{$unwind: '$surveys'}, {$unwind: '$surveys.survey'}, {$match: {'surveys._id': mongoose.Types.ObjectId(surveyId)}}, {
        $project: {
            "login": false, "password": false, "_id": false,
        }
    }, {$group: {_id: "$surveys.survey"}}]);
}

async function getAll() {
    return await config.userModel.aggregate([{$unwind: '$surveys'}, {$unwind: '$surveys.survey'}, {
        $project: {
            "login": false, "password": false, "_id": false,
        }
    }, {$group: {_id: "$surveys._id", "surveys": {$addToSet: "$surveys.survey"}}}])
}

module.exports = {
    createSurvey, getAll, getSurveyBySurveyId
}
