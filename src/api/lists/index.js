const express = require('express');
const Router = express.Router();

const listController = require('./lists.controller');

Router.post('/post', listController.postList);//{ name: String, owner: ObjectId }
Router.get('/get/byownerid', listController.getListByOwnerId);//{ userid: ObjectId }
Router.get('/get/bylistid', listController.getListById); //{ id: ObjectId }
Router.put('/put/name', listController.putName);//{ id: ObjectId,name: String }
Router.put('/put/members', listController.putMembers);//{ id: ObjectId, members: array }
Router.put('/put/member/remove', listController.removeMember);//{ id: ObjectId, members: array }
Router.delete('/delete', listController.deleteListByObjId);//{ id: ObjectId }

module.exports = Router;
