const express = require('express');
const Router = express.Router();

const taskController = require('./tasks.controller');

Router.post('/post', taskController.addTask); //{ name: String, listIn: ObjectId, isStarred: boolean }
Router.delete('/delete', taskController.deleteTaskByObjId);//{ id: ObjectId }
Router.get('/:list_id', taskController.getTaskByListId);

module.exports = Router;
