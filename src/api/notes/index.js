const express = require('express');
const Router = express.Router();

const notesController = require('./notes.controller');

// Router.get('/notes', getAllNotes);
Router.post('/', notesController.postAddNote);

module.exports = Router;
