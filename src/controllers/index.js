const express = require('express');
const Router = express.Router();

const navigationController = require('./navigation.controller');

Router.get('/login', navigationController.getLoginPage);
Router.get('/signup', navigationController.getSignupPage);

module.exports = Router;
