const express = require('express');
const Router = express.Router();

const listController = require('./lists.controller');

Router.get('/getall', listController.getAllListByOwnerId);
Router.put('/update', listController.updateList);//{ id: ObjectId,name: String,members: [{member: ObjectId}],tasks:[{task: ObjectId}] }
Router.delete('/delete', listController.deleteListByObjId);//{ id: ObjectId }
Router.post('/', listController.addList);//{ name: String, owner: ObjectId }

module.exports = Router;
