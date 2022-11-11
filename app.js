const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apiRouter = require('./api/api');
const {emptyException} = require("./exceptions/emptyException");
const {JsonWebTokenError} = require("./exceptions/jsonWebTokenError");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api', apiRouter);

app.use(function (err, req, res, next) {
    let error;

    if (err.status === undefined) {
        error = new emptyException(err.message);
    } else error = err;

    if (err.name === "JsonWebTokenError") {
        error = new JsonWebTokenError();
    }


    res.status(error.status);
    res.json({error: error.message});
});

module.exports = app;
