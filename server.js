/**
 * Modules dependencies
 */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const path = require('path');
const logger = require('morgan');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const errorHandler = require('errorhandler');

/**
 * Load configurations
 */
const config = require('./config.json');

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
 * Import Routers
 */
// TODO: import all routers here

 /**
  * Express configurations
  */
app.set('port', config.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/src/views');
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
// express session configs
app.use(session({
  resave: false,
  secret: config.SESSION_SECRET,
  saveUninitialized: true
}));
// TODO: configs middleware and set environment variables here

/**
 * Routers is used here
 */
 app.get('/', (req, res) => {
   res.render('index');
 });

/**
 * Errors handler
 */
 app.use(errorHandler());

/**
 * Start express server
 */
 app.listen(app.get('port'), (req, res) => {
   console.log('%s App is running on http://localhost:%d\n\tPress Ctrl-C to stop sever', chalk.green('✓'), app.get('port'));
 });
