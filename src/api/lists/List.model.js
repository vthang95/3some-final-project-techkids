const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema =  new mongoose.Schema({
  name: { type: String, require: true },
  members: [{ type: ObjectId, ref: 'User' }],
  tasks: [{  type: ObjectId, ref: 'Task' }],
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const List = mongoose.model('List', listSchema);

module.exports = List;
