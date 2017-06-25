const express = require('express');
const Router = express.Router();

const listController = require('./lists.controller');

Router.post('/:list_id/members', listController.putMembers);//{ list_id: ObjectId, members: array }
Router.post('/', listController.postList);//{ name: String, owner: ObjectId }
Router.get('/all/:user_id', listController.getListByOwnerId);//{ user_id: ObjectId }
Router.get('/:list_id', listController.getListById); //{ list_id: ObjectId }
Router.put('/:list_id', listController.putName);//{ list_id: ObjectId,name: String }
Router.delete('/:list_id/member', listController.removeMember);//{ list_id: ObjectId, member: String }
Router.delete('/:list_id', listController.deleteListByObjId);//{ id: ObjectId }

module.exports = Router;
