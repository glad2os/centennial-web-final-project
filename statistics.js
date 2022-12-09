const {getAllInquirerId, getStatisticsByInquirerId} = require("./model/statistics");
const {config} = require("./config/database");

async function updateCachedStatistics() {
    let inquirerIds = await getAllInquirerId();

    if (inquirerIds.length === 0) {
        return;
    }

    let answers = [];

    for (let it of inquirerIds) {
        const inqId = it._id.toString()
        let r = await getStatisticsByInquirerId(inqId);
        let allAnswers = [];

        r.forEach(_r => {
            allAnswers.push(_r.inquirerAnswers);
        })

        const unique = (value, index, self) => {
            return self.indexOf(value) === index
        }

        let uniqueNumbers = allAnswers.filter(unique);


        let count = uniqueNumbers.map(id => {
            return {
                id: id, count: allAnswers.filter(it => it === id).length
            }
        })

        answers.push({
            id: inqId, statistics: count
        });
    }

    config.cachedStatistics.collection.updateMany({}, {
        $set: {
            answers
        }
    }, {upsert: true})
}

module.exports = {updateCachedStatistics}