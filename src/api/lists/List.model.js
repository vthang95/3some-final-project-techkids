const mongoose = require('mongoose');

const listSchema =  new mongoose.Schema({
  name: String,
  members: [{ type: ObjectId, ref : 'User' }],
  tasks: [{  type: ObjectId, ref : 'Task' }],
  owner: { type : ObjectId, ref : 'User' }
}, { timestamps: true });

const List = mongoose.model('List', listSchema);

module.exports = List;
