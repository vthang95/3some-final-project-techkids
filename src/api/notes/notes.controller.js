const Note = require('./Note.model');
const User = require('../users/User.model');

exports.deleteNoteByNoteId = (req, res) => {
  req.assert('note_id', 'note_id id required');

  const errors = req.validationErrors();
  if(errors) return res.json({ error: errors });

  let note_id = req.body.id;

  Note.remove({ _id: note_id }, (err) => {
    if(err) return res.json({ error_msg: "An error occurred!" });
    return res.json({ msg: 'Delete success!' });
  })
}

exports.updateNote = (req, res) => {
  let newInfo = {
    note_id: req.params.note_id,
    title: req.body.title,
    content: req.body.content,
    labelColor: req.body.labelColor
  }

  Note.update(
    { _id: newInfo.note_id },
    { $set: { title: newInfo.title, content: newInfo.content, labelColor: newInfo.labelColor } }
  )
  .exec((err) => {
    if (err) return res.json({ error_msg: "An error occurred!" });
    return res.json({ msg: 'Update success!' });
  });
}

exports.getAllNotes = (req, res) => {
  let owner_id = req.params.owner_id;

  Note.find({ owner: owner_id })
  .populate('owner', 'email username')
  .exec((err, docs) => {
    if (err) return res.json({ error_msg: "An error occurred!" });
    return res.json(docs);
  })
};

exports.postAddNote = (req, res) => {
  req.assert('owner', '! owner is required').notEmpty();

  const errors = req.validationErrors();
  if(errors) return res.json({ error: errors });

  let note = new Note({
    title     : req.body.title,
    content   : req.body.content,
    labelColor: req.body.labelColor,
    owner     : req.body.owner
  });

  note.save((err) => {
    if (err) return res.json({ error_msg: "An error occurred!" });
    return res.json({ success_msg: "Success!", newNote: note });
  });
};
