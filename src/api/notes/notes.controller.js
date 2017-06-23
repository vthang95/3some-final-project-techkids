const Note = require('./Note.model');

exports.getAllNotes = (req, res) => {

};

exports.postAddNote = (req, res) => {
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
