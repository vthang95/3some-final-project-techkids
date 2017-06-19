const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubtaskSchema =  new mongoose.Schema({
  name: { type: String, require: true },
  isDone: { type: Boolean, default: false },
  childOf: { type: Schema.Types.ObjectId, ref: 'Task', required: true }
}, { timestamps: true });

const Subtask = mongoose.model('subtasks', subtaskSchema);

module.exports = Subtask;
