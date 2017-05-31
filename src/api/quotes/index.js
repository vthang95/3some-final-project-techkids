const express = require('express');
const Router = express.Router();

const quotesController = require('./quotes.controller');

Router.get('/', quotesController.getRndQuote);
Router.post('/', quotesController.postQuote);

module.exports = Router;
