const express = require('express');
const Router = express.Router();

const navigationController = require('../navigation.controller');

Router.get('/', navigationController.getHome);
Router.get('/login', navigationController.getLoginPage);
Router.get('/signup', navigationController.getSignupPage);
Router.get('/workspace', navigationController.getWorkspacePage);

module.exports = Router;
