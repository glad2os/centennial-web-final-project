const express = require('express');
const md5 = require('md5');

const userModel = require("../../model/user");
const userDAO = require("../entities/userDAO");

const router = express.Router();

router.post('/register', async function (req, res) {
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
        res.end();
    } else {
        res.status(400);
        res.end();
    }
});

router.post('/login', async function (req, res) {
    let user = await userModel.getUser(userDAO.of(req.body.login, md5(req.body.password)));

    if (user[0] !== undefined) {
        req.session.userid = user[0].id;
        res.status(200);
        res.end();
    } else {
        res.status(403);
        res.end();
    }
});

module.exports = {
    router
}