const {config} = require("../config/database");
const {mongoose} = require("mongoose");

async function createSurvey(userid, survey) {
    return await config.userModel.collection.updateOne({_id: mongoose.Types.ObjectId(userid)}, {
        $push: {
            "surveys": {
                "_id": new mongoose.Types.ObjectId(), inquirer: survey
            }
        }
    }, {multi: true});
}

async function getSurveyById(surveysId) {
    return config.userModel.aggregate([{$unwind: '$surveys'}, {$unwind: '$surveys.inquirer'},
        {$match: {'surveys._id': mongoose.Types.ObjectId(surveysId)}}, {
            $project: {
                "login": false, "password": false, "_id": false,
            }
        }, {$group: {_id: "$surveys.inquirer"}}]);
}

async function getInquirerById(inquirerId){
    return config.userModel.aggregate([
        {$unwind: '$surveys'},
        {$unwind: '$surveys.inquirer'},
        {$match: {"surveys.inquirer._id": mongoose.Types.ObjectId(inquirerId)}},
        {$project: {_id: false, login: false, password: false}},
        {$group: {_id: "$surveys.inquirer"}}
    ])
}

async function getAll() {
    return await config.userModel.aggregate([{$unwind: '$surveys'}, {$unwind: '$surveys.inquirer'}, {
        $project: {
            "login": false, "password": false, "_id": false,
        }
    }, {$group: {_id: "$surveys._id", "inquirer": {$addToSet: "$surveys.inquirer"}}}])
}

async function remove(surveyId) {
    return await config.userModel.updateMany({}, {$pull: {"surveys": {"_id": mongoose.Types.ObjectId(surveyId)}}});
}

async function inquirerUpdate(surveyId, inquirerId) {

    let inquirer = await config.userModel.findById({
        "_id": mongoose.Types.ObjectId("636924c33f365433c8a89cd8"),
        "surveys._id": mongoose.Types.ObjectId("63692b8dda87c344d03dae3d"),
        "surveys.inquirer._id": mongoose.Types.ObjectId("63692b8dda87c344d03dae39")
    },  { "surveys.inquirer.$[1]": true});

    if (inquirer === null){
        return undefined;
    }

    return inquirer;
}

module.exports = {
    createSurvey, getAll, remove, inquirerUpdate, getSurveyById, getInquirerById
}
