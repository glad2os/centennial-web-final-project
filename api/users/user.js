const express = require('express');
const md5 = require('md5');

const userModel = require("../../model/user");
const userDAO = require("../entities/userDAO");

const router = express.Router();

const {verifyAccessToken, generateAccessToken} = require("../jwt");
const {invalidCredentials} = require("../../exceptions/invalidCredentials");
const {getUserById} = require("../../model/user");


router.post('/token', async function (req, res, next) {
    try {
        const userToken = await verifyAccessToken(req.body.token);
        const userById = await getUserById(userToken.username);

        res.json({username: userById.login});
    } catch (e) {
        next(e);
    }
});

router.post('/register', async function (req, res, next) {
    try {
        const user = userDAO.of(req.body.login, md5(req.body.password), []);
        let parseUser = await userModel.getUser(user, []);

        if (parseUser.length !== 0) {
            res.status(400);
            res.end();
            return;
        }

        let newUser = await userModel.addUser(user);

        if (newUser.insertedId && newUser.acknowledged) {
            res.status(200);
        } else {
            res.status(400);
        }

        res.end();
    } catch (e) {
        next(e);
    }
});

router.post('/login', async function (req, res, next) {
    try {
        let user = await userModel.getUser(userDAO.of(req.body.login, md5(req.body.password)));

        if (user[0] !== undefined && user[0].login.length > 0) {

            let token = generateAccessToken(user[0]._id);

            res.status(200);
            res.json({token: token});
        } else {
            throw new invalidCredentials();
        }
    } catch (e) {
        next(e);
    }
});

module.exports = {
    router
}