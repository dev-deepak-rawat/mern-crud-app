const express = require('express');
const cors = require('cors');
const users = require('../userRoute');

module.exports = function (app) {
    app.use(cors());

    app.use(cors());
    app.use(express.json());
    app.use('/users', users);
};