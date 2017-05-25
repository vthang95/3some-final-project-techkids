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
  if (errors) {
    return res.json({ error: errors });
  } else {
    let newUser = new User({
      username: req.body.username,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    });
    User.findOne({ email: req.body.email.toLowerCase() }, (err, existingUser) => {
      if (err) return next(err);
      if (existingUser)
        return res.json({ error_msg: 'Account with that email is already exists!'});

      newUser.save((err) => {
        if (err)
          return next(err);
        return res.json({ success_msg: 'Success!' });
      });
    });
  }
};
