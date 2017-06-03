const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema =  new mongoose.Schema({
  name : { type: String, require: true },
  duaDate : Date,
  note : String,
  isDone : { type: Boolean, default: false },
  isStarred : Boolean,
  important: Number,
  comments: [{
    comment: { type: String },
    commentBy: { type : Schema.Types.ObjectId, ref : 'users' }
  }],
  listIn : { type : Schema.Types.ObjectId, ref : 'lists', required: true },
  taskChilds : [{ taskChild: { type : Schema.Types.ObjectId, ref : 'subtasks'} }]
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
