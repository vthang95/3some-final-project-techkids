const express = require('express');
const Router = express.Router();
const userController = require('./users.controller');

Router.post('/signup', (req, res) => {
  userController.signUp(req, res, req.body);
});









module.exports = Router;
