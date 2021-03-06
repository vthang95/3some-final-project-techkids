const express = require('express');
const Router = express.Router();

const userController = require('./users.controller');

Router.post('/signup', userController.postSignup);
Router.post('/login', userController.postLogin);
Router.get('/search', userController.getSearchUserByEmail);
Router.get('/logout', userController.getLogout);
Router.get('/:username', userController.getUserByUsername);

module.exports = Router;
