const mongoose = require('mongoose');

const User = require('./User.model');

exports.postSignup = (req, res, next) => {
  req.assert('email', '! Email is required.').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', '! Password is required.').notEmpty();
  req.assert('confirmPassword', '! Confirm Password is required.').notEmpty()  ;
  req.assert('password', '! Password must be at least 4 characters long.').len(4);
  req.assert('confirmPassword', '! Passwords do not match.').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) return res.json({ error: errors });

  let newUser = new User({
    username: req.body.username,
    email: req.body.email.toLowerCase(),
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  });

  User.findOne({ email: req.body.email.toLowerCase() }, (err, existingUser) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (existingUser)
      return res.json({ error_msg: 'Account with that email is already exists!'});

    newUser.save((err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      return res.json({ success_msg: 'Success!' });
    });
  });
};

exports.getSearchUserByEmail = (req, res) => {
  let regex = new RegExp(req.query.q, 'i');
  User
    .find(
      { $or: [{'email': regex}, {'username': regex}]  },
      { uid: 1, email: 1, _id: 0, username: 1, createdAt: 1, updatedAt: 1, 'profile.picture': 1 }
    )
    .lean()
    .limit(20)
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        return res.json({ error_msg: 'An error occurred!' });
      }
      res.json(docs);
    });
};

/**
 * Mọi người để ý query nhé. object thứ 2 chính là những thứ mình cần lấy. value 1 tức là lấy, 0 là không lấy.
 * Mình không cần phải cookie data như anh Long nữa
 */

exports.getUserByUsername = (req, res) => {
  let _username = req.params.username;

  User
    .findOne(
      { username: _username },
      { _id: 0, email: 1, username: 1, createdAt: 1, updatedAt: 1, 'profile.picture': 1 }
    )
    .lean()
    .exec((err, doc) => {
      if (err) {
        console.log(err);
        return res.json({ error_msg: 'An error occurred!' });
      }
      if (!doc) return res.json({ error_msg: 'User not found!' });
      return res.json(doc);
    });
}
