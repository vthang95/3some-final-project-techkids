const express = require('express');
const Router = express.Router();

const listController = require('./lists.controller');

Router.post('/add', listController.addList);
Router.get('/getall', listController.getAllListByOwnerId);
Router.put('/update', listController.updateList);
Router.delete('/delete', listController.deleteListByObjId);

module.exports = Router;
