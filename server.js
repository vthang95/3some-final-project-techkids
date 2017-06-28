/**
 * Modules dependencies
 */
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
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
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;

/**
 * Import Routers
 */
const usersRouter = require('./src/api/users/index');
const listsRouter = require('./src/api/lists/index');
const tasksRouter = require('./src/api/tasks/index');
const subtasksRouter = require('./src/api/subtasks/index');
const notesRouter = require('./src/api/notes/index');
const navigationRouter = require('./src/controllers/routes/navigation.route');
/**
 * Load configurations
 */
const config = require('./config.json');
const passportConfig = require('./config/passport.config');

/**
 * Connect database with mongoose
 */
 const options = {
     server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
     replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
 };

mongoose.Promise = global.Promise;
mongoose.connect(config.MLAB_PRODUCTION_DB_URI, options);
mongoose.connection.on('error', (err) => {
  console.log(err);
  console.log('%s MongoDB connection error! Please make sure MongoDB is running', chalk.red('✗'));
  process.exit();
});
mongoose.connection.once('open', () => console.log('%s Connected to mLab', chalk.green('✓')));
// mongoose.connection.once('open', () => console.log('%s Connected to localDB', chalk.green('✓')));
/**
 * Express configurations
 */
app.set('port', process.env.PORT || 7000);
//export to front end

app.set('views', __dirname + '/src/views');
// set template engine as pug. https://pugjs.org/api/getting-started.html
app.set('view engine', 'pug');
// use compression middleware to compress response bodies for all request that traverse through the middleware
app.use(compression());
// use sass middleware to handle scss file in public
app.use(sass({
  src : path.join(__dirname, 'public'),
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
  resave            : false,
  secret            : config.SESSION_SECRET,
  saveUninitialized : true
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
      , root        = namespace.shift()
      , formParam   = root;

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
  return res.json({ name: req.user.username, user_id: req.user._id });
});

app.use('/api/users', usersRouter);
app.use('/api/lists', passportConfig.isAuthenticated, listsRouter);
app.use('/api/tasks', passportConfig.isAuthenticated, tasksRouter);
app.use('/api/notes', passportConfig.isAuthenticated, notesRouter);
app.use('/subtasks', passportConfig.isAuthenticated, subtasksRouter);

app.get('/contact', passportConfig.isAuthenticated, (req, res) => {
  return res.json('ok');
});

// app.use('/users', usersRouter);
// app.use('/lists', listsRouter);
// app.use('/tasks', tasksRouter);
// app.use('/notes', notesRouter);
app.use('/', navigationRouter);
app.get('*', (req, res) => {
  if (!req.user) return res.render('pageNotFound', { title: 'Page Not Found!' });
  return res.render('workspace');
});

/**
 * SOCKET CHANEL
 */
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


/**
 * Errors handler, (prettify error)
 */
app.use(errorHandler());

/**
 * Start express server
 */
server.listen(app.get('port'), (req, res) => {
  console.log(
    '%s App is running on http://localhost:%d\n\tPress Ctrl-C to stop sever',
    chalk.green('✓'),
    app.get('port'));
});

// set the views folder for template engine
