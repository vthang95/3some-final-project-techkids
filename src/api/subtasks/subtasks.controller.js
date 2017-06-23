const mongoose = require('mongoose');

const Subtask = require('./Subtask.model');
const Task = require('../tasks/Task.model');

exports.addSubtask = (req, res) => {
  req.assert('name', '! name is required').notEmpty();
  req.assert('childOf', '! childOf is required').notEmpty();

  const errors = req.validationErrors();
  if(errors) return res.json({ error: errors });

  let newSubtask = new Subtask({
    name: req.body.name,
    childOf: req.body.childOf
  });

  Task.findOne({ _id: newSubtask.childOf })
  .exec((err, doc) => {
    if(err) {
      console.log(err);
      return res.json({ error_msg: 'Something wrong!' });
    }
    if(!doc){
      console.log('Can not find List who this Task childOf');
      return res.json({ error_msg: 'Can not find List who this Task childOf' });
    }
    newSubtask.save((err) => {
      if(err) {
        console.log(err);
        return res.json({ error_msg: 'Something is wrong!' });
      }
      return res.json({ success_msg: 'Add new Task success!' });
    })
  })
}

exports.getSubtaskByTaskId = (req, res) => {
  let task_id = req.params.task_id;

  Subtask.find({ childOf: task_id })
  .exec((err, doc) => {
    if(err){
      console.log(err);
      return res.json({ error_msg: 'An error occurred!' });
    }
    return res.json(doc);
  })
}

exports.updateSubtask = (req, res) => {
  req.assert('subtask_id', '! subtask_id is required').notEmpty();

  const errors = req.validationErrors();
  if(errors) return res.json({ error: errors });

  let newInfo = {
    subtask_id: req.params.subtask_id,
    name: req.body.name,
    isDone: req.body.isDone
  }

  if(newInfo.name){
    Subtask.update({ _id: newInfo.subtask_id }, { $set: { name: newInfo.name } })
    .exec((err) => {
      console.log(err);
    })
  }
  if(newInfo.isDone){
    Subtask.update({ _id: newInfo.subtask_id }, { $set: { isDone: newInfo.isDone } })
    .exec((err) => {
      console.log(err);
    })
  }
  return res.json({ error_msg: 'Update subtask success!' });
}

exports.deleteSubtaskById = (req, res) => {
  Subtask.remove({ _id: req.body.id })
  .exec((err, doc) => {
    console.log(err);
    return res.json({ msg_err: err });
  })
  return res.json({ msg: "Delete subtask success" });
}
