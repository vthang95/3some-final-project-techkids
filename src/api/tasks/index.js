const express = require('express');
const Router = express.Router();

const taskController = require('./tasks.controller');

Router.post('/', taskController.addTask); // { name: String, listIn: ObjectId, isStarred: boolean }
Router.post('/:task_id/comment', taskController.postComment); //{ task_id, userId, comment }
Router.get('/:list_id', taskController.getTaskByListId);
Router.put('/:task_id', taskController.updateTask);
Router.delete('/', taskController.deleteTaskByObjId);// { id: ObjectId }

module.exports = Router;
