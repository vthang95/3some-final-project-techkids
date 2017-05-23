const mongoose = require('mongoose');

const User = require('./User.model');

exports.postSignUp = (req, res, next) => {
  User.findOne({})
    .select('uid')
    .sort({
      uid: -1
    })
    .exec((err, matchUser) => {
      if (err) {
        console.log(err);
        res.json({ error_msg: 'An error occurred!' });
      }
      let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      newUser.uid = (matchUser && matchUser.uid) ? matchUser.uid + 1 : 1;
      newUser.save((err) => {
        if (err) {
          return next(err);
        }
      });
      return res.json({
        success_msg: 'Success!'
      });
    });
}
