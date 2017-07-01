const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema =  new mongoose.Schema({
  name   : { type: String, require: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  owner  : { type: Schema.Types.ObjectId, ref: 'users', required: true },
  status : { type: Number, default: 1 }
}, { timestamps: true });

const List = mongoose.model('lists', listSchema);

module.exports = List;
