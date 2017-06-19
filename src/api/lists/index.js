const express = require('express');
const Router = express.Router();

const listController = require('./lists.controller');

Router.post('/post', listController.postList);//{ name: String, owner: ObjectId }
Router.get('/getall', listController.getListByOwnerId);//{ userid: ObjectId }
Router.get('/getbyid', listController.getListById); //{ id: ObjectId }
Router.put('/update', listController.updateList);//{ id: ObjectId,name: String,members: [ObjectId] }
Router.delete('/delete', listController.deleteListByObjId);//{ id: ObjectId }

module.exports = Router;
