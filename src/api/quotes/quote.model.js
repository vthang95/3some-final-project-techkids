const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema =  new mongoose.Schema({
  content: { type: String, require: true },
  author : { type:String}
}, { timestamps: true });

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
