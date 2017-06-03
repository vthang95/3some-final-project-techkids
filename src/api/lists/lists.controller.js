const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const List = require('./List.model');

exports.addList = (req, res) => {
  req.assert('name', '! Name is required').notEmpty();
  req.assert('owner', '! Owner is required. If testing, check database to get ObjectId of User model ').notEmpty();

  const errors = req.validationErrors();
  if(errors) return res.json({ error: errors });

  let newList = new List({
    name: req.body.name,
    owner: req.body.owner//Changed when the time come :3
  });

  newList.save((err) => {
    if(err) {
      console.log(err);
      return;
    }
    return res.json({ success_msg: 'Add list success!' });
  });
};

exports.getAllListByOwnerId = (req, res) => {
  console.log("Sao no ko vao day nhi??");
  let _idOwner = req.query.userid;//Sẽ sửa thành lấy _id của User từ session
  List.find({ owner: _idOwner }).exec((err, doc) => {
    if(err){
      console.log(err);
      return;
    }
    if(!doc) return res.json({ msg: 'User dont have any list' });
    console.log("hehehe");
    return res.json(doc);
  });
};

// id: ObjectId
// name: String
// members: array
// tasks: undefine
exports.updateList = (req, res) => {
  req.assert('id', '! id is required').notEmpty();

  const errors = req.validationErrors();
  if(errors) return res.json({ error: errors });

  let newInfo = {
    id: req.body.id,
    name: req.body.name,
    members: req.body.members,
    tasks: req.body.tasks
  }

  if(newInfo.name) {
    changeNameList(newInfo.id, newInfo.name, (err) => {
      if(err) res.json({ msg_err: err });
    })
  }

  if(newInfo.members) {
    addMemberToList(newInfo.id, newInfo.members, (err) => {
      if(err) res.json({ msg_err: err });
    });
  }

  res.json({ msg: 'update list success' });
};

var changeNameList = (id, newName, callback) => {
  List.update({ _id: id }, { $set: { name: newName } }).exec((err) => {
    callback(err);
  });
};

//TODO: Kiểm tra trùng người dùng && Kiểm tra người dùng có tồn tại không
var addMemberToList = (idList, members, callback) => {
  console.log(members);
  List.update({ _id: idList },
    { $push: { members: { $each: members} } }).exec((err) => {
    callback(err);
  });
}

var addTaskToList = (callback) => {
  callback();
}

exports.deleteListByObjId = (req, res) => {
  List.remove({ id: req.body.id }).exec((err) => {
    if(err) res.json({ msg_err: err });
    res.json({ msg: "Delete list success" });
  })
};
