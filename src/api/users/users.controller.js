const mongoose = require('mongoose');
const User = require('./User.model');
signUp = (req, res, inputData) => {
  console.log(inputData);
  User.findOne({})
    .select('uid')
    .sort({
      uid: -1
    })
    .exec((err, matchUser) => {
      if (err) {
        console.log(err);
        return res.send("Error");
      } else {
        let newUser = new User({
          username: inputData.username,
          email: inputData.email,
          password: inputData.password
        });
        newUser.uid = (matchUser && matchUser.uid) ? matchUser.uid + 1 : 1;
        newUser.save((err) => {
          if (err) {
            return next(err);
          }
        });
        return res.json({ success_msg: 'Success!' });
      }
    });
}







module.exports = {
  signUp
}
