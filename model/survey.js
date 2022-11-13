const {config} = require("../config/database");
const {mongoose} = require("mongoose");

async function createSurvey(userid, topic, survey) {
    return await config.userModel.collection.updateOne({_id: mongoose.Types.ObjectId(userid)}, {
        $push: {
            "surveys": {
                "_id": new mongoose.Types.ObjectId(),
                "topic" : topic,
                inquirer: survey
            }
        }
    }, {multi: true});
}

async function getSurveyById(surveysId) {
    return config.userModel.aggregate([{$unwind: '$surveys'}, {$unwind: '$surveys.inquirer'}, {$match: {'surveys._id': mongoose.Types.ObjectId(surveysId)}}, {
        $project: {
            "login": false, "password": false, "_id": false,
        }
    }, {$group: {_id: "$surveys.inquirer"}}]);
}

async function getInquirerById(inquirerId) {
    return config.userModel.aggregate([{$unwind: '$surveys'}, {$unwind: '$surveys.inquirer'}, {$match: {"surveys.inquirer._id": mongoose.Types.ObjectId(inquirerId)}}, {
        $project: {
            _id: false, login: false, password: false
        }
    }, {$group: {_id: "$surveys.inquirer"}}])
}

async function getAll() {
    return await config.userModel.aggregate([{$unwind: '$surveys'}, {$unwind: '$surveys.inquirer'}, {
        $project: {
            "login": false, "password": false, "_id": false
        }
    }, {$group: {_id: "$surveys._id", "topic": {$addToSet: "$surveys.topic"},
            "inquirer": {$addToSet: "$surveys.inquirer"}}}])
}

async function remove(surveyId) {
    return await config.userModel.updateMany({}, {$pull: {"surveys": {"_id": mongoose.Types.ObjectId(surveyId)}}});
}

async function inquirerUpdate(surveyId, inquirerId, newInquirer) {
    return await config.userModel.updateOne({}, {
        $set: {
            "surveys.$[surveys].inquirer.$[inquirer].question": newInquirer.question,
            "surveys.$[surveys].inquirer.$[inquirer].answers": Array.from(newInquirer.answers)
        }
    }, {
        arrayFilters: [{
            "surveys._id": mongoose.Types.ObjectId(surveyId)
        }, {
            "inquirer._id": mongoose.Types.ObjectId(inquirerId)
        }]
    });
}


async function inquirerDelete(surveyId, inquirerId) {
    return await config.userModel.updateOne({}, {
        $pull: {
            "surveys.$[surveys].inquirer": {
                "_id": mongoose.Types.ObjectId(inquirerId)
            }
        }
    }, {
        arrayFilters: [{
            "surveys._id": mongoose.Types.ObjectId(surveyId)
        }]
    })
}

module.exports = {
    createSurvey, getAll, remove, inquirerUpdate, getSurveyById, getInquirerById, inquirerDelete
}
