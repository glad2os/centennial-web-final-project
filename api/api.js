const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const users = require('./users/user');
const survey = require('./users/survey');
const statistics = require('./statistics/statistics');
const {updateCachedStatistics} = require("../statistics");
const cron = require('node-cron');

const config = require("../config/database").config;

try {
    config.initialize().then(() => {
        console.log('MongoDB connected');
        cron.schedule(process.env.UPDATE_CACHE_CRON, async () => {
            await updateCachedStatistics();
            console.log(`updated cache ${new Date()}`)
        }, {
            scheduled: true,
        });

        updateCachedStatistics().then(r => {
            console.log(`updated cache ${new Date()}`)
        });

    });



} catch (err) {
    throw err;
}

router.use(express.json());
router.use("/users", users.router);
router.use("/survey", survey.router);
router.use("/statistics", statistics.router);

router.post('/', function (req, res) {
    res.json({version: process.env.npm_package_version, application: "back-end"});
});

router.post('/status', async function (req, res) {
    try {
        const mongodb = await mongoose.connect(process.env.DB_HOST);
        res.json({
            version: process.env.npm_package_version, application: "back-end", mongodb: mongodb.connection.readyState
        });
    } catch (ex) {
        res.json({errorMessage: ex});
    }
});

module.exports = router;