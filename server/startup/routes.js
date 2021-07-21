const express = require('express');
const cors = require('cors');
const users = require('../userRoute');
const error = require('../middlewares/error');

module.exports = function (app) {
    app.use(cors());
    const corsOptions = {
        exposedHeaders: 'Authorization',
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use('/users', users);
    app.use(error);
};