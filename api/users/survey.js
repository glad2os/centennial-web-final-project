const express = require('express');

const userModel = require("../../model/user");
const surveyModel = require("../../model/survey");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {noDataFound} = require("../../exceptions/noDataFound");
const {JsonWebTokenError} = require("../../exceptions/jsonWebTokenError");
const {dataFormat} = require("../../exceptions/dataFormat");
const {emptyException} = require("../../exceptions/emptyException");
const router = express.Router();

async function verifyAccessToken(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET);
}

router.post('/create', async function (req, res, next) {
    try {
        let userToken = await verifyAccessToken(req.body.token);

        let inquirer = req.body.inquirer;

        if (!inquirer) {
            throw new noDataFound();
        }

        inquirer.forEach(survey => {
            if (!survey.hasOwnProperty("question") || !survey.hasOwnProperty("answers")) {
                throw new dataFormat();
            }
        });

        inquirer = inquirer.map(v => ({_id: new mongoose.Types.ObjectId(), ...v})).map(value => {
            return {
                _id: value._id, question: value.question, answers: Array.from(value.answers)
            }
        })

        const user = await userModel.getUserById(userToken.username);
        let newSurvey = await surveyModel.createSurvey(user._id, inquirer);

        res.json(newSurvey);
    } catch (e) {
        next(e);
    }
});

router.post('/getall', async function (req, res) {
    res.json(await surveyModel.getAll());
});

router.post('/inquirer/:id', async function (req, res, next) {
    try {
        let userToken = await verifyAccessToken(req.body.token);

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new dataFormat();
        }

        res.json(await surveyModel.getInquirerById(req.params.id));

    } catch (e) {
        next(e);
    }
});

router.post('/remove/:id', async function (req, res, next) {
    try {
        let userToken = await verifyAccessToken(req.body.token);

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new dataFormat();
        }

        const survey = await surveyModel.getSurveyById(req.params.id);

        if (survey === []) {
            throw new noDataFound();
        }

        // TODO: validate is the survey belongs to the current user
        res.json(await surveyModel.remove(req.params.id));
    } catch (e) {
        next(e);
    }
});

router.post('/get/:id', async function (req, res, next) {
    try {
        let userToken = await verifyAccessToken(req.body.token);

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new dataFormat();
        }

        // TODO: validate is the survey belongs to the current user
        res.json(await surveyModel.getSurveyById(req.params.id));

    } catch (e) {
        next(e);
    }
});

router.post('/get/:s_id/update/inquirer/:i_id', async function (req, res, next) {
    try {
        let userToken = await verifyAccessToken(req.body.token);

        if (!(mongoose.Types.ObjectId.isValid(req.params.s_id) || mongoose.Types.ObjectId.isValid(req.params.i_id))) {
            throw new dataFormat();
        }

        let inquirer = req.body.inquirer;

        if (!inquirer) {
            throw new noDataFound();
        }

        if (!inquirer.hasOwnProperty("question") || !inquirer.hasOwnProperty("answers")) {
            throw new dataFormat();
        }

        // TODO: validate is the survey belongs to the current user
        res.json(await surveyModel.inquirerUpdate(req.params.s_id, req.params.i_id, req.body.inquirer));
    } catch (e) {
        next(e);
    }
});

router.post('/get/:s_id/delete/inquirer/:i_id', async function (req, res, next) {
    try {
        let userToken = await verifyAccessToken(req.body.token);

        if (!(mongoose.Types.ObjectId.isValid(req.params.s_id) || mongoose.Types.ObjectId.isValid(req.params.i_id))) {
            throw new dataFormat();
        }

        // TODO: validate is the survey belongs to the current user
        res.json(await surveyModel.inquirerDelete(req.params.s_id, req.params.i_id, req.body.inquirer));
    } catch (e) {
        next(e);
    }
});


module.exports = {
    router
}