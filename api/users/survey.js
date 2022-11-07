const express = require('express');

const md5 = require('md5');
const userModel = require("../../model/user");
const surveyModel = require("../../model/survey");
const userDAO = require("../entities/userDAO");
const mongoose = require("mongoose");
const {Error} = require("mongoose");
const router = express.Router();

router.post('/create', async function (req, res) {
    if (req.session.userid === undefined || !await userModel.validateUserBySessionData(req.session.userid)) {
        res.status(403);
        res.json({error: "Authorization Error"});
        return;
    }

    let surveys = req.body.surveys;

    if (!surveys) {
        res.status(400);
        res.json({error: "No data found!"});
        return;
    }

    try {
        surveys.forEach(survey => {
            if (!survey.hasOwnProperty("question") || !survey.hasOwnProperty("answers")) {
                throw "Error data format!"
            }
        })
    } catch (e) {
        res.status(400);
        res.json({error: e});
        return;
    }

    surveys = surveys.map(v => ({_id: new mongoose.Types.ObjectId(), ...v})).map(value => {
        return {
            _id: value._id,
            question: value.question,
            answers: Array.from(value.answers)
        }
    })

    const user = await userModel.getUserById(req.session.userid);
    let newSurvey = await surveyModel.createSurvey(user._id, surveys);

    res.json(newSurvey);
});

module.exports = {
    router
}