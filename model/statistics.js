const {config} = require("../config/database");
const {mongoose, models} = require("mongoose");

async function getAllInquirerId() {
    return config.statisticsModel.aggregate([{
        $group: {
            _id: "$_inquirerId"
        }
    }]);
}

async function getStatisticsByInquirerId(inquirerId) {
    return config.statisticsModel.aggregate([{
        $match: {
            "_inquirerId": mongoose.Types.ObjectId(inquirerId)
        }
    }, {
        $project: {
            _id: 0, _inquirerId: 0
        }
    }

    ])
}

async function getAll() {
    return await config.cachedStatistics.aggregate([{
        $project: {_id: 0}
    }])
}

module.exports = {
    getAllInquirerId, getStatisticsByInquirerId, getAll
}