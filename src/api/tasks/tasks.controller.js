const mongoose = require('mongoose');

const Task = require('./Task.model');
const List = require('../lists/List.model');
const User = require('../users/User.model');

exports.addTask = (req, res) => {
  req.assert('name', '! name is required').notEmpty();
  req.assert('listIn', '! Task list in a List, this field require a ObjectId of a List. If testing, check database to get ObjectId of List model ').notEmpty();

  const errors = req.validationErrors();
  if(errors) return res.json({ error: errors });

  let newTask = new Task({
    name     : req.body.name,
    listIn   : req.body.listIn,
    isStarred: req.body.isStarred ? req.body.isStarred : false
  });

  //Find List who have this newTask
  List.findOne({ _id: newTask.listIn }, (err, doc) => {
    if(err) {
      console.log(err);
      return res.json({ error_msg: 'Something wrong!' });
    }
    if(!doc){
      console.log('Can not find List who this Task childOf');
      return res.json({ error_msg: 'Can not find owner' });
    }
    //Found List, save Task
    newTask.save((err) => {
      if(err) {
        console.log(err);
        return res.json({ error_msg: 'Something is wrong!' });
      }
      Task.findOne(newTask, { _id: 1, name: 1, isStarred: 1, listIn: 1 }).exec((err, doc) => {
        if (err) {
          console.log(err);
          return res.json({ error_msg: 'Something is wrong!' });
        };
        return res.json(doc);
      })
    });
  })

};

exports.getTaskByListId = (req, res) => {
  console.log(req.params)
  let list_id = req.params.list_id;

  Task.find({ listIn: list_id }, (err, doc) => {
    if (err) {
      console.log(err);
      return res.json({ error_msg: 'An error occurred!' });
    }
    return res.json(doc)
  });
};

exports.updateTask = (req, res) => {
  let id = req.params.task_id;

  Task.findOne({ _id: id }, (err, doc) => {
    if (err) return res.json({ error_msg: 'An error occurred!' });
    doc.name      = req.body.name || doc.name;
    doc.duaDate   = req.body.duaDate || doc.duaDate;
    doc.note      = req.body.note || doc.note;
    doc.isDone    = req.body.isDone || doc.isDone;
    doc.isStarred = req.body.isStarred || doc.isStarred;
    doc.important = req.body.important || doc.important;

    Task.findOneAndUpdate({ _id: id }, doc, (err, task) => {
      if (err) return res.json({ error_msg: 'An error occurred!' });
      return res.json(task)
    })
  });
};

exports.postComment = (req, res) => {
  req.assert('task_id', '! task_id is required').notEmpty();
  req.assert('userId', '! userId is required').notEmpty();
  req.assert('comment', '! comment is required').notEmpty();
  const errors = req.validationErrors();
  if(errors) return res.json({ error: errors });

  let info = {
    taskId : req.params.task_id,
    userId : req.body.userId,
    comment: req.body.comment
  }
  console.log(info);
  User.findOne({ _id: info.userId }, (err, doc) => {
    if(err){
      console.log(err);
      res.json({ error_msg: 'Something wrong when find user!' });
      return;
    }
    if(!doc) {
      res.json({ error_msg: 'User not found' });
      return;
    }

    console.log(info.taskId);

    Task.findOneAndUpdate(
      { _id: info.taskId },
      { $push: { comments: { comment: info.comment, commentBy: info.userId } } }
    )
    .exec((err, doc) => {
      if(err){
        console.log(err);
        res.json({ error_msg: 'Something wrong when find task!' });
        return;
      }

      res.json({ error_msg: 'add comment success' });
    });
  })
}


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

exports.deleteTaskByObjId = (req, res) => {
  Task.remove({ _id: req.params.task_id }).exec((err) => {
    if(err) {
      console.log(err);
      return res.json({ msg_err: err });
    }
    return res.json({ msg: "Delete task success" });
  })
};
