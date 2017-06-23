const express = require('express');
const Router = express.Router();

const subtaskController = require('./subtasks.controller');

Router.post('/', subtaskController.addSubtask);
Router.get('/:task_id', subtaskController.getSubtaskByTaskId);
Router.put('/:subtask_id', subtaskController.updateSubtask);
Router.delete('/', subtaskController.deleteSubtaskById);

module.exports = Router;
