const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  downloadURL: { type: String, createdDate: Date.now }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;


// var UserSchema = new mongoose.Schema({
//   urls: [{type: mongoose.SchemaTypes.Url}]
// });
