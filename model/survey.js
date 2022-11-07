const {config} = require("../config/database");
const {mongoose} = require("mongoose");

async function createSurvey(userid, statisticsDAO, callback){
    return callback(await config.userModel.collection.updateOne({_id: mongoose.Types.ObjectId(userid)}, {
        $push: {
            "surveys": {
                "_id": new mongoose.Types.ObjectId(),
                statisticsDAO
            }
        }
    }, {multi: true}));
}

module.exports = {
    createSurvey
}
