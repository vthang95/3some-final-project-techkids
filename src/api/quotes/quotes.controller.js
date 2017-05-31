const mongoose = require('mongoose');

const Quote = require('./Quote.model');

exports.postQuote = (req,res,next) => {
  let newQuote = new Quote({
    content : req.body.content,
    author : req.body.author
  });
  newQuote.save((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.json({ success_msg :'Success' })
  })
}

exports.getRndQuote = (req,res,next) => {
 Quote.aggregate({ $sample: { size: 1 } })
 .exec((err, doc) => {
   if (err) { 
     console.log(err);
     return res.json({ error_msg: 'An error occurred!' });
   }
   if (!doc) return res.json({ error_msg: 'Quote not found!' });
   return res.json(doc);
 });
}
