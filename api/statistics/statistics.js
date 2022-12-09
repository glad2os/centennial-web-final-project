const express = require('express');
const {getAll} = require("../../model/statistics");
const router = express.Router();

router.post('/info', async function (req, res, next) {
    try {
        res.json(await getAll());
    } catch (e) {
        next(e);
    }
});

module.exports = {
    router
}