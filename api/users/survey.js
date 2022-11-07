const express = require('express');

const md5 = require('md5');
const userModel = require("../../model/user");
const surveyModel = require("../../model/survey");
const userDAO = require("../entities/userDAO");
const router = express.Router();

router.post('/create', async function (req, res) {
    console.log(req.body);
    await userModel.getUser(userDAO.of(req.body.login, md5(req.body.password)), (r) => r[0]).then(async r => {
        if (r === undefined) {
            res.status(403);
            res.json({error: "Authorization Error"});
        } else {
            await surveyModel.createSurvey(r._id, )
        }
    });
});

module.exports = {
    router
}