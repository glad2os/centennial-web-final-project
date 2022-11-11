const express = require('express');
const md5 = require('md5');

const userModel = require("../../model/user");
const userDAO = require("../entities/userDAO");

const router = express.Router();

const jwt = require('jsonwebtoken');

function generateAccessToken(username) {
    return jwt.sign({username: username}, process.env.TOKEN_SECRET, {expiresIn: '7d'});
}

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
    } else {
        res.status(400);
    }

    res.end();
});

router.post('/login', async function (req, res) {
    let user = await userModel.getUser(userDAO.of(req.body.login, md5(req.body.password)));

    if (user[0] !== undefined && user[0].login.length > 0) {

        let token = generateAccessToken(user[0]._id);

        res.status(200);
        res.json({token: token});
    } else {
        res.status(403);
        res.json({error: "Invalid credentials"});
    }
});

module.exports = {
    router
}