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
