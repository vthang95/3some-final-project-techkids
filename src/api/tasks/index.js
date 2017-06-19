const express = require('express');
const Router = express.Router();

const taskController = require('./tasks.controller');

Router.post('/post', taskController.addTask); //{ name: String, listIn: ObjectId, isStarred: boolean }
Router.delete('/delete', taskController.deleteTaskByObjId);//{ id: ObjectId }

module.exports = Router;
