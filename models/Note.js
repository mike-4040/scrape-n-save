const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  note: {
    type: String,
    required: true
  },
  articleId: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
