
const mongoose = require('mongoose');

const pasteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  syntax: { type: String, default: 'text' },
  visibility: { type: String, default: 'Public' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Paste', pasteSchema);
