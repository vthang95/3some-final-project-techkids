const mongoose = require('mongoose');

const TaskSchema =  new mongoose.Schema({
  name : String,
  duaDate : Date,
  note : String,
  isDone : Boolean,
  isStarred : Boolean,
  important: Number,
  comments: [{
    type : String,
    { type : ObjectId, ref : 'User' }
  }],
  listIn : { type : ObjectId, ref : 'List' },
  taskChilds : [{
    type : ObjectId, ref : 'Subtask'
  }]
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
