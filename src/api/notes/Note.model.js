const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: { type: String },
  content: String,
  owner: Schema.Types.ObjectId,
  labelColor: String,
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
