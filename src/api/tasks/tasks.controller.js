const mongoose = require('mongoose');

const Task = require('./Task.model');
const List = require('../lists/List.model');

exports.addTask = (req, res) => {
  req.assert('name', '! Name is required').notEmpty();
  req.assert('listIn', '! Task list in a List, this field require a ObjectId of a List. If testing, check database to get ObjectId of List model ').notEmpty();

  const errors = req.validationErrors();
  if(errors) return res.json({ error: errors });

  let newTask = new Task({
    name: req.body.name,
    listIn: req.body.listIn,
    isStarred: req.body.isStarred ? req.body.isStarred : false
  });

  newTask.save((err) => {
    if(err) {
      console.log(err);
      return res.json({ error_msg: 'Something is wrong!' });
    }
    return res.json({ success_msg: 'Add Task success!' });
  });
  //Update List who have this newTask
  List.findOneAndUpdate({ _id: newTask.listIn }, { $push: { tasks: newTask._id } }, (err, doc) => {
    if(err) {
      console.log(err);
      Task.remove({ _id: newTask.id });
      return res.json({ error_msg: 'Something wrong!' })
    }
    if(!doc){
      Task.remove({ _id: newTask.id });
      return res.json({ error_msg: 'Can not find owner' })
    }
  })

};

exports.updateTask = (req, res) => {
  req.assert('id', '! id is required').notEmpty();

  const errors = req.validationErrors();
  if(errors) return res.json({ error: errors });

  let newInfo = {
    id: req.body.id,
    name: req.body.name,
    duaDate: req.body.duaDate,
    note: req.body.note,
    isDone: req.body.isDone,
    isStarred: req.body.isStarred,
    important: req.body.important,
    comment: req.body.comment
  }

  if(newInfo.name) {
    changeNameTask(newInfo.id, newInfo.name, (err) => {
      if(err) res.json({ error_msg: err });
    })
  }

  if(newInfo.duaDate){
    setDueDate(newInfo.id, newInfo.duaDate, (err) => {
      if(err) res.json({ error_msg: err });
    })
  }

  if(newInfo.note) {
    setNote(newInfo.id, newInfo.note, (err) => {
      if(err) res.json({ error_msg: err });
    })
  }

  if(newInfo.isDone) {
    setIsDone(newInfo.id, newInfo.isDone, (err) => {
      if(err) res.json({ error_msg: err });
    })
  }

  if(newInfo.isStarred) {
    setIsStarred(newInfo.id, newInfo.isStarred, (err) => {
      if(err) res.json({ error_msg: err });
    })
  }

  if(newInfo.important) {
    setImportant(newInfo.id, newInfo.important, (err) => {
      if(err) res.json({ error_msg: err });
    })
  }

  if(newInfo.comment){
    addCommentToTask(newInfo.id, newInfo.comment, (err) => {
      if(err) res.json({ error_msg: err });
    })
  }

  res.json({ msg: 'update task success' });
};

var changeNameTask = (id, newName, callback) => {
  Task.update({ _id: id }, { $set: { name: newName } }).exec((err) => {
    callback(err);
  });
};

var setDueDate = (id, duaDateString, callback) => {
  let duaDate = new Date(duaDateString);
  Task.update({ _id: id }, { $set: { duaDate: new Date(duaDate) } }).exec((err) => {
    callback();
  })
};

var setNote = (id, noteString, callback) => {
  Task.update({ _id: id }, { $set: { note: noteString } }).exec((err) => {
    callback();
  })
}

var setIsDone = (id, isDoneBoolean, callback) => {
  Task.update({ _id: id }, { $set: { isDone: isDoneBoolean } }).exec((err) => {
    callback();
  })
}

var setIsStarred = (id, isStarredBoolean, callback) => {
  Task.update({ _id: id }, { $set: { isStarred:isStarredBoolean } }).exec((err) => {
    callback();
  })
}

var setImportant = (id, importantNum, callback) => {
  Task.update({ _id: id }, { $set: { important: importantNum } }).exec((err) => {
    callback();
  })
}

var addCommentToTask = (id, commentObj, callback) => {
  Task.update({ _id: id }, { $push: { comments: { comment: commentObj.comment, commentBy: commentObj.commentBy } } }).exec((err) => {
    callback();
  })
}

exports.deleteTaskByObjId = (req, res) => {
  Task.remove({ _id: req.body.id }).exec((err) => {
    if(err) res.json({ msg_err: err });
    res.json({ msg: "Delete task success" });
  })
};
