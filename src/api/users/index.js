const express = require('express');
const Router = express.Router();

const userController = require('./users.controller');

Router.post('/signup', userController.postSignup);

module.exports = Router;
