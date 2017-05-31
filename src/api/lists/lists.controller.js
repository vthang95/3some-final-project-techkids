const mongoose = require('mongoose');

const List = require('./List.model');

exports.addList = (req, res) => {
  let newList = new List({
    name: req.body.name;
    
  })
}
