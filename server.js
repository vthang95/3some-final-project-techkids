/**
 * Modules dependencies
 */
const express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const path = require('path');
const logger = require('morgan');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const errorHandler = require('errorhandler');
const sass = require('node-sass-middleware')

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
   res.render('home');
 });

 app.get('*', (req, res) => {
  res.render('home');
 });

/**
 * Errors handler, (prettify error)
 */
 app.use(errorHandler());

/**
 * Start express server
 */
 app.listen(app.get('port'), (req, res) => {
   console.log('%s App is running on http://localhost:%d\n\tPress Ctrl-C to stop sever', chalk.green('✓'), app.get('port'));
 });
