const express = require('express');
const Router = express.Router();

const notesController = require('./notes.controller');

// Router.get('/notes', getAllNotes);
Router.post('/', notesController.postAddNote);
Router.get('/:owner_id', notesController.getAllNotes);
Router.put('/:note_id', notesController.updateNote);
Router.delete('/', notesController.deleteNoteByNoteId);

module.exports = Router;
