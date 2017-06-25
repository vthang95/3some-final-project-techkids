const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const User = require('../src/api/users/User.model');
const config = require('../config.json');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy({ usernameField: 'login' },
  function(login, password, done) {
    User.findOne({ $or: [{ 'email': login.toLowerCase() }, { 'username': login }] }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { msg: `! Username/Email "${login}" not found.` });
      }
      user.comparePassword(password, user.password, (err, isMatch) => {
        if (err) { return done(err); }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: 'Invalid username/email or password.' });
      });
    });
  }
));

exports.signToken = user => {
  return jwt.sign({id: user._id, username: user.username, email: user.email}, config.SESSION_SECRET);
};

exports.decodeToken = token => {
  return jwt.verify(token, config.SESSION_SECRET);
};

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  return res.json({ error_msg: 'Authenticate failed!' });
};
