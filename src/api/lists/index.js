const express = require('express');
const Router = express.Router();

const listController = require('./lists.controller');

Router.post('/add', listController.addList);
Router.get('/getall', listController.getAllListByOwnerId);
// Router.get('/hehe', listController.gethehe);
module.exports = Router;
