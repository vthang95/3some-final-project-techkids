const mongoose = require('mongoose');

const SubtaskSchema =  new mongoose.Schema({
  name : String,
  isDone : Boolean,
  childOf : { type : ObjectId, ref : 'Task' }
}, { timestamps: true });

const Subtask = mongoose.model('Subtask', subtaskSchema);

module.exports = Subtask;
