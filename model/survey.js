const {config} = require("../config/database");
const {mongoose} = require("mongoose");

async function createSurvey(userid, survey){
    return await config.userModel.collection.updateOne({_id: mongoose.Types.ObjectId(userid)}, {
        $push: {
            "surveys": {
                "_id": new mongoose.Types.ObjectId(),
                survey
            }
        }
    }, {multi: true});
}

module.exports = {
    createSurvey
}
