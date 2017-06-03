/**
 * Modules dependencies
 */
const express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const path = require('path');
const flash = require('express-flash');
const logger = require('morgan');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const errorHandler = require('errorhandler');
const sass = require('node-sass-middleware');
const LocalStrategy = require('passport-local').Strategy;

/**
 * Import Routers
 */
const usersRouter = require('./src/api/users/index');
const listsRouter = require('./src/api/lists/index');
const tasksRouter = require('./src/api/tasks/index');
/**
 * Load configurations
 */
const config = require('./config.json');
const passportConfig = require('./config/passport.config');

/**
 * Create app
 */
const app = express();

/**
 * Connect database with mongoose
 */
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.log(err);
  console.log('%s MongoDB connection error! Please make sure MongoDB is running', chalk.red('✗'));
  process.exit();
});
/**
 * Express configurations
 */
app.set('port', config.PORT || 3000);
// set the views folder for template engine
app.set('views', __dirname + '/src/views');
// set template engine as pug. https://pugjs.org/api/getting-started.html
app.set('view engine', 'pug');
// use compression middleware to compress response bodies for all request that traverse through the middleware
app.use(compression());
// use sass middleware to handle scss file in public
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
// use logger to see what requests is comming, just for devoloper see
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());
// express session configs
app.use(session({
  resave: false,
  secret: config.SESSION_SECRET,
  saveUninitialized: true
}));
// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
      req.path !== '/users/login' &&
      req.path !== '/users/signup' &&
      !req.path.match(/^\/auth/) &&
      !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
      req.path == '/account') {
    req.session.returnTo = req.path;
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
// TODO: configs middleware and set environment variables here
app.use(flash());


// Express Validator middleware option. Read Express Validator documents for more details
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

/**
 * Routers is used here
 */

app.get('/api/workspace', (req, res) => {
  res.json({ name: 'vthang95' });
});

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Oh!List'
  });
});

app.get('/login', (req, res) => {
  if (req.user) return res.redirect('/');
  return res.render('home');
});

app.get('*', (req, res) => {
  res.render('home', {
    title: 'Page Not Found!'
  });
});

app.use('/users', usersRouter);
app.use('/lists', listsRouter);
app.use('/tasks', tasksRouter);

/**
 * Errors handler, (prettify error)
 */
app.use(errorHandler());

/**
 * Start express server
 */
app.listen(app.get('port'), (req, res) => {
  console.log(
    '%s App is running on http://localhost:%d\n\tPress Ctrl-C to stop sever',
    chalk.green('✓'),
    app.get('port'));
});
