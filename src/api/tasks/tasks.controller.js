const mongoose = require('mongoose');

const Task = require('./Task.model');

exports.addTask = (req, res) => {
  req.assert('name', '! Name is required').notEmpty();
  req.assert('listIn', '! Task list in a List, this field require a ObjectId of a List. If testing, check database to get ObjectId of List model ').notEmpty();

  const errors = req.validationErrors();
  if(errors) return res.json({ error: errors });

  let newTask = new Task({
    name: req.body.name,
    listIn: req.body.listIn
  });

  newTask.save((err) => {
    if(err) {
      console.log(err);
      return;
    }
    return res.json({ success_msg: 'Add Task success!' });
  });
};

exports.updateList = (req, res) => {
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
    comment: req.body.comment,
    taskChildId: req.body.taskChildId
  }

  if(newInfo.name) {
    changeNameTask(newInfo.id, newInfo.name, (err) => {
      if(err) res.json({ msg_err: err });
    })
  }

  res.json({ msg: 'update list success' });
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

var setImportan = (id, importantNum, callback) => {
  Task.update({ _id: id }, { $set: { important: importantNum } }).exec((err) => {
    callback();
  })
}

var addCommentToTask = (id, commentObj, callback) => {
  Task.update({ _id: id }, { $push: { comments: { comment: commentObj.comment, commentBy: commentObj.commentBy } } }).exec((err) => {
    callback();
  })
}

var addTaskChild = (id, taskChildId, callback) => {
  Task.update({ _id: id }, { $push: { taskChilds: { taskChild: taskChildId } } }).exec((err) => {
    callback();
  })
}

exports.deleteTaskByObjId = (req, res) => {
  Task.remove({ _id: req.body.id }).exec((err) => {
    if(err) res.json({ msg_err: err });
    res.json({ msg: "Delete task success" });
  })
};
