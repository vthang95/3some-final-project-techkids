const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema =  new mongoose.Schema({
  name: { type: String, require: true },
  members: [{ member: { type: Schema.Types.ObjectId, ref: 'users' } }],
  tasks: [{ task: {  type: Schema.Types.ObjectId, ref: 'tasks' } }],
  owner: { type: Schema.Types.ObjectId, ref: 'users', required: true }
}, { timestamps: true });

const List = mongoose.model('List', listSchema);

module.exports = List;
