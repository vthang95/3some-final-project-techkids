const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const List = require('./List.model');
const User = require('../users/User.model');

exports.postList = (req, res) => {
  req.assert('name', '! Name is required').notEmpty();
  req.assert('owner', '! Owner is required. If testing, check database to get ObjectId of User model ').notEmpty();

  const errors = req.validationErrors();
  if(errors) return res.json({ error: errors });

  let newList = new List({
    name: req.body.name,
    owner: req.body.owner
  });

  newList.save((err) => {
    if(err) {
      console.log(err);
      return res.json({ error_msg: 'An error occurred!'});
    }

    User.findOneAndUpdate({ _id: newList.owner }, { $push: { lists: newList._id } }, (err, doc) => {
      if(err){
        console.log(err);
        List.remove({ _id: newList._id });
        return res.json({ error_msg: 'Something wrong!' })
      }
      if(!doc){
        List.remove({ _id: newList._id });
        return res.json({ error_msg: 'Can not find owner' })
      }
    })
    return res.json({ success_msg: 'Add list success!' });
  });
};

exports.getListByOwnerId = (req, res) => {
  let ownerId = req.query.userid;
  List.find({ owner: ownerId }).populate('owner').populate('members').populate('tasks').exec((err, doc) => {
    if(err){
      console.log(err);
      return res.json({ error_msg: 'An error occurred!'});
    }
    if(!doc) return res.json({ msg: 'User dont have any list' });

    return res.json(doc);
  });
};

exports.getListById = (req, res) => {
  let id = req.query.id;
  List.find({ _id: id }).populate('owner').populate('members').populate('tasks').exec((err, doc) => {
    if(err){
      console.log(err);
      return res.json({ error_msg: 'An error occurred!'});
    }
    if(!doc) return res.json({ msg: 'Find not found!' });

    return res.json(doc);
  });
}

// id: ObjectId
// name: String
// members: array
exports.updateList = (req, res) => {
  req.assert('id', '! id is required').notEmpty();

  const errors = req.validationErrors();
  if(errors) return res.json({ error_msg: errors });

  let newInfo = {
    id: req.body.id,
    name: req.body.name,
    members: req.body.members
  }

  if(newInfo.name) {
    changeNameList(newInfo.id, newInfo.name, (err) => {
      if(err) res.json({ error_msg: err });
    })
  }

  if(newInfo.members) {
    addMemberToList(newInfo.id, newInfo.members, (err) => {
      if(err) res.json({ error_msg: err });
    });
  }

  res.json({ msg: 'update list success' });
};

var changeNameList = (id, newName, callback) => {
  List.update({ _id: id }, { $set: { name: newName } }).exec((err) => {
    callback(err);
  });
};

//TODO:Kiểm tra người dùng có tồn tại không
var addMemberToList = (idList, members, callback) => {
  List
    .update({ _id: idList }, { $addToSet: { members: { $each: members} } })
    .exec((err) => {
      callback(err);
    });
}

exports.deleteListByObjId = (req, res) => {
  List.remove({ id: req.body.id }).exec((err) => {
    if(err) res.json({ error_msg: err });
    res.json({ msg: "Delete list success" });
  })
};
