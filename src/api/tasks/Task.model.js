const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema =  new mongoose.Schema({
  name : { type: String, require: true },
  duaDate : Date,
  note : String,
  isDone : { type: Boolean, default: false },
  isStarred : Boolean,
  important: Number,
  comments: [{
    type : String,
    { type : Schema.Types.ObjectId, ref : 'User' }
  }],
  listIn : { type : Schema.Types.ObjectId, ref : 'List', required: true },
  taskChilds : [{
    type : Schema.Types.ObjectId, ref : 'Subtask'
  }]
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
