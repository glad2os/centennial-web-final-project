const config = require("../config/database").config;
const {mongoose} = require('mongoose');

async function addUser(userDAO, callback) {
    return callback(await config.userModel.collection.insertOne(userDAO));
}

async function getUser(userDAO, callback) {
    return callback(await config.userModel.find({
        $and: [{
            "login": `${userDAO.login}`, "password": `${userDAO.password}`
        }]
    }));
}

async function validateUserBySessionData(userId) {
    const userDAO = await config.userModel.find({_id: mongoose.Types.ObjectId(userId)});
    return userDAO[0] !== undefined && userDAO[0].password.length > 0;
}

async function getUserById(userId) {
    const userDAO = await config.userModel.find({_id: mongoose.Types.ObjectId(userId)});
    return userDAO[0];
}


module.exports = {
    addUser,
    getUser,
    validateUserBySessionData,
    getUserById
}