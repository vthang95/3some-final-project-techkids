const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const List = require('./List.model');
const Task = require('../tasks/Task.model');
const Subtask = require('../subtasks/Subtask.model');
const User = require('../users/User.model');

exports.postList = (req, res) => {
  req.assert('name', '! name is required').notEmpty();
  req.assert('owner', '! owner is required. If testing, check database to get ObjectId of User model ').notEmpty();

  const errors = req.validationErrors();
  if(errors) return res.json({ error: errors });

  let newList = new List({
    name : req.body.name,
    owner: req.body.owner
  });

  User.findOne({ _id: newList.owner }, (err, doc) => {
    if(err){
      console.log(err);
      return res.json({ error_msg: 'Something wrong!' })
    }
    if(!doc){
      return res.json({ error_msg: 'Can not find owner' })
    }
    newList.save((err) => {
      if(err) {
        console.log(err);
        return res.json({ error_msg: 'An error occurred!'});
      }
      return res.json({ success_msg: 'Add list success!' });
    });
  })
};

exports.getListByOwnerId = (req, res) => {
  req.assert('user_id', '! user_id is required').notEmpty();

  const errors = req.validationErrors();
  if(errors) return res.json({ error: errors });

  let ownerId = req.params.user_id;

  List.find({ owner: ownerId })
  .populate('owner', 'email username')
  .populate('members', 'email username')
  .exec((err, doc) => {
    if(err){
      console.log(err);
      return res.json({ error_msg: 'An error occurred!'});
    }
    if(!doc) return res.json({ msg: 'User dont have any list' });

    return res.json(doc);
  });
};

exports.getListById = (req, res) => {
  req.assert('list_id', '! list_id is required').notEmpty();

  const errors = req.validationErrors();
  if(errors) return res.json({ error: errors });

  let id = req.params.list_id;

  List.find({ _id: id }, { __v: 0 })
  .populate('owner', 'email username')
  .populate('members', 'email username')
  .exec((err, doc) => {
    if(err){
      console.log(err);
      return res.json({ error_msg: 'An error occurred!'});
    }
    if(!doc) return res.json({ msg: 'Find not found!' });

      return res.json(doc);
    }
  );
}

// id: ObjectId
// name: String
exports.putName = (req, res) => {
  req.assert('list_id', '! list_id is required').notEmpty();
  req.assert('name', '! name is required').notEmpty();

  const errors = req.validationErrors();
  if(errors) return res.json({ error_msg: errors });

  let newInfo = {
    id: req.params.list_id,
    name: req.body.name
  }

  if(newInfo.name) {
    changeNameList(newInfo.id, newInfo.name, (err) => {
      if(err) {
        res.json({ error_msg: err });
        return;
      }
    })
  }

  res.json({ msg: 'update name of list success' });
};

//TODO: check xem co list ko
var changeNameList = (id, newName, callback) => {
  List.update({ _id: id }, { $set: { name: newName } })
  .exec((err) => {
    callback(err);
  });
};

// id: ObjectId
// name: String
// members: array of member info (ObjectId or username or email)
exports.putMembers = (req, res) => {
  req.assert('list_id', '! list_id is required').notEmpty();
  req.assert('members', '! id is required').notEmpty();

  const errors = req.validationErrors();
  if(errors) return res.json({ error_msg: errors });

  let newInfo = {
    id: req.params.list_id,
    members: req.body.members
  }

  if(newInfo.members) {
    addMemberToList(newInfo.id, newInfo.members, (err) => {
      if(err) console.log(err);
    });
  }

  res.json({ msg: 'put members to list success' });
}

var addMemberToList = (idList, members, callback) => {
  if(typeof members != 'object' || !members.length){
    console.log('Member is empty');
    callback('Member is empty');
    return;
  }
  members.forEach((memberInfo) => {
    if(mongoose.Types.ObjectId.isValid(memberInfo)) {
      User.findById(memberInfo)
      .exec((err, doc) => {
        if(err){
          console.log(err);
          callback(err);
        }
        if(doc){
          List.update(
            { _id: idList },
            { $addToSet: { members: doc._id } }
          )
          .exec((err) => {
            callback(err);
          });
        }
      });
    }
    else {
      User.findOne({ $or: [{'email': memberInfo}, {'username': memberInfo}] })
      .exec((err, doc) => {
        if(err){
          console.log(err);
          callback(err);
        }
        if(doc){
          List.update(
            { _id: idList },
            { $addToSet: { members: doc._id } }
          )
          .exec((err) => {
            callback(err);
          });
        }
      });
    }
  });
}

// id: ObjectId
// name: String
// member: member info (ObjectId or username or email)
exports.removeMember = (req, res) => {
  req.assert('list_id', '! list_id is required').notEmpty();
  req.assert('member', '! member is required').notEmpty();

  const errors = req.validationErrors();
  if(errors) return res.json({ error_msg: errors });

  let reqInfo = {
    id    : req.params.list_id,
    member: req.body.member
  }

  if(reqInfo.member) {
    removeMemberFromList(reqInfo.id, reqInfo.member, (err) => {
      if(err) res.json({ error_msg: err });
    });
  }

  res.json({ msg: 'remove members to list success' });
}

var removeMemberFromList = (idList, memberInfo, callback) => {
  if(mongoose.Types.ObjectId.isValid(memberInfo)) {
    User.findById(memberInfo).exec((err, doc) => {
      if(err){
        console.log(err);
        callback(err);
      }
      if(doc){
        List.update({ _id: idList }, { $pull: { members: doc._id }}).exec((err) => {
          console.log('hehe');
          callback(err);
        });
      }
    });
  }
  else {
    User.findOne({ $or: [{'email': memberInfo}, {'username': memberInfo}] })
    .exec((err, doc) => {
      if (err) {
        console.log(err);
        callback(err);
      }
      if (doc) {
        List.update({ _id: idList }, { $pull: { members: doc._id }}).exec((err) => {
          console.log(err);
          callback(err);
        });
      }
    });
  }
}

exports.deleteListByObjId = (req, res) => {
  let list_id = req.params.list_id;

  Task.find({ listIn: list_id })
  .exec((err, docs) => {
    if(err) console.log('lists.controller.js: ', err);
    if(typeof docs != undefined) {
      docs.forEach((doc) => {
        Subtask.remove({ childOf: doc._id })
        .exec((err) => {
          if(err) console.log('lists.controller.js: ', err);
        })
      })
    }
    Task.remove({ listIn: list_id }).exec((err) => {
      if(err) console.log('lists.controller.js: ', err);
      console.log('deleted task in list id: ', list_id);
    })
  })
  List.remove({ _id: list_id }).exec((err) => {
    if(err){
      console.log('lists.controller.js: ', err);
      res.json({ error_msg: err });
    }
    res.json({ msg: "Delete list success" });
  })
};
