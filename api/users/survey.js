const express = require('express');

const userModel = require("../../model/user");
const surveyModel = require("../../model/survey");
const mongoose = require("mongoose");
const router = express.Router();

router.post('/create', async function (req, res) {
    // TODO: Need a security fix
    if (req.session.userid === undefined || !await userModel.validateUserBySessionData(req.session.userid)) {
        res.status(403);
        res.json({error: "Authorization Error"});
        return;
    }

    let inquirer = req.body.inquirer;

    if (!inquirer) {
        res.status(400);
        res.json({error: "No data found!"});
        return;
    }

    try {
        inquirer.forEach(survey => {
            if (!survey.hasOwnProperty("question") || !survey.hasOwnProperty("answers")) {
                throw "Error data format!"
            }
        })
    } catch (e) {
        res.status(400);
        res.json({error: e});
        return;
    }

    inquirer = inquirer.map(v => ({_id: new mongoose.Types.ObjectId(), ...v})).map(value => {
        return {
            _id: value._id,
            question: value.question,
            answers: Array.from(value.answers)
        }
    })

    const user = await userModel.getUserById(req.session.userid);
    let newSurvey = await surveyModel.createSurvey(user._id, inquirer);

    res.json(newSurvey);
});

router.post('/getall', async function (req, res) {
    // TODO: Need a security fix
    if (req.session.userid === undefined || !await userModel.validateUserBySessionData(req.session.userid)) {
        res.status(403);
        res.json({error: "Authorization Error"});
        return;
    }

    res.json(await surveyModel.getAll());
});

router.post('/id/:id', async function (req, res) {
    // TODO: Need a security fix
    if (req.session.userid === undefined || !await userModel.validateUserBySessionData(req.session.userid)) {
        res.status(403);
        res.json({error: "Authorization Error"});
        return;
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        res.json({error: "Invalid survey id!"});
        return;
    }

    res.json(await surveyModel.getSurveyBySurveyId(req.params.id));
});

router.post('/remove/:id', async function (req, res) {
    // TODO: Need a security fix
    if (req.session.userid === undefined || !await userModel.validateUserBySessionData(req.session.userid)) {
        res.status(403);
        res.json({error: "Authorization Error"});
        return;
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        res.json({error: "Invalid survey id!"});
        return;
    }

    const survey = await surveyModel.getSurveyBySurveyId(req.params.id);
    if (survey === []) {
        res.status(400);
        res.json({error: `Was not found the survey by id ${req.params.id}`});
        return;
    }

    // TODO: validate is the survey belongs to the current user
    res.json(await surveyModel.remove(req.params.id));
});

router.post('/survey/:id', async function (req, res) {
    // TODO: Need a security fix
    if (req.session.userid === undefined || !await userModel.validateUserBySessionData(req.session.userid)) {
        res.status(403);
        res.json({error: "Authorization Error"});
        return;
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        res.json({error: "Invalid survey id!"});
        return;
    }

    // TODO: validate is the survey belongs to the current user
    res.json(await surveyModel.getSurveysSurveyBySurveysSurveyID(req.params.id));
});

router.post('/update/:id', async function (req, res) {
    // TODO: Need a security fix
    if (req.session.userid === undefined || !await userModel.validateUserBySessionData(req.session.userid)) {
        res.status(403);
        res.json({error: "Authorization Error"});
        return;
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        res.json({error: "Invalid survey id!"});
        return;
    }

    const survey = await surveyModel.getSurveysSurveyBySurveysSurveyID(req.params.id);

    if (survey === []) {
        res.status(400);
        res.json({error: `Was not found the survey by id ${req.params.id}`});
        return;
    }

    //TODO: create a surveysSurveyDAO class
    //TODO: validate structure
    const surveysSurveyDAO = {
        _id: mongoose.Types.ObjectId(req.params.id), question: req.body.question, answers: Array.from(req.body.answers)
    }

    console.log(surveysSurveyDAO);
    // TODO: validate is the survey belongs to the current user
    res.json(await surveyModel.update(surveysSurveyDAO));
});

module.exports = {
    router
}