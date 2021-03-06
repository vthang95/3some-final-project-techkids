const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./User.model');
const passportConfig = require("../../../config/passport.config");

exports.postLogin = (req, res, next) => {
  req.assert('login', '! Username/Email cannot be blank').notEmpty();
  req.assert('password', '! Password cannot be blank').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  };

  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      req.flash('errors', info);
      return res.redirect('/login');
    };
    req.logIn(user, (err) => {
      if (err) return next(err);
      req.session.token = passportConfig.signToken(user);
      console.log('in controller', req.session.id)
      // res.json({ msg: 'Success! You are logged in.' });
      res.redirect('/workspace');
    });
  })(req, res, next);
};

exports.postSignup = (req, res, next) => {
  // Phần này là của express-validation https://github.com/ctavan/express-validator
  // Từ form phía client gửi tới. Nếu name field nào có giá trị không hợp lệ sẽ được gắn lỗi vào req.validationErrors
  req.assert('username', '! Username is required.').notEmpty();
  req.assert('username', '! Username must be at least 4 characters.').len(4);
  req.assert('email', '! Email is required.').notEmpty();
  req.assert('email', '! Email is not valid').isEmail();
  req.assert('password', '! Password is required.').notEmpty();
  req.assert('confirmPassword', '! Confirm Password is required.').notEmpty()  ;
  req.assert('password', '! Password must be at least 4 characters long.').len(4);
  req.assert('confirmPassword', '! Passwords do not match.').equals(req.body.password);

  // nếu có lỗi sẽ gán vào errors. và send error messages tới client
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors)
    return res.redirect('/signup')
  };

  let newUser = new User({
    username: req.body.username,
    email: req.body.email.toLowerCase(),
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  });

  User.findOne({ $or: [{email: newUser.email}, {username: newUser.username}] }, (err, existingUser) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (existingUser) {
      req.flash('errors', { msg: 'Account with that email or username is already exists!' });
      return res.redirect('/signup');
    }

    newUser.save((err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      req.flash('success', { msg: 'Success! You can login now.' })
      return res.redirect("/login");
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
      return res.json(docs);
    });
};

/**
 * Mọi người để ý query nhé. object thứ 2 chính là những thứ mình cần lấy. value 1 tức là lấy, 0 là không lấy.
 * Mình không cần phải cook data như anh Long nữa
 */

exports.getUserByUsername = (req, res) => {
  let _username = req.params.username;

  User
    .findOne(
      { username: _username },
      { _id: 0, email: 1, username: 1, createdAt: 1, updatedAt: 1, 'profile.picture': 1 }
    )
    .exec((err, doc) => {
      if (err) {
        console.log(err);
        return res.json({ error_msg: 'An error occurred!' });
      }
      if (!doc) return res.json({ error_msg: 'User not found!!!' });
      return res.json(doc);
    });
}

exports.getLogout = (req, res) => {
  req.logout();
  res.redirect('/');
};
