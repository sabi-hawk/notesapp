const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  title: String,
  body: String,
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;