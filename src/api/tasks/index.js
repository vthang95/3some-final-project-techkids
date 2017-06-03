const express = require('express');
const Router = express.Router();

const taskController = require('./tasks.controller');

Router.post('/add', taskController.addTask);
Router.delete('/delete', taskController.deleteTaskByObjId);

module.exports = Router;
