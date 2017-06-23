const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema =  new mongoose.Schema({
  name    : { type: String, require: true },
  duaDate : Date,
  isDone : { type: Boolean, default: false },
  isStarred : Boolean,
  important : Number,
  comments  : [{
    comment  : String,
    commentBy: { type : Schema.Types.ObjectId, ref : 'users' }
   }],
  listIn : { type : Schema.Types.ObjectId, ref : 'lists', required: true }
}, { timestamps: true });

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;
