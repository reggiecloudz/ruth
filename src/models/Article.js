const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoURL: {
      type: String,
      match: [/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, 'Please provide a valid URL']
    },
    imagePath: { type: String },
    content: { type: String, required: true },
    state: { type: String, enum: ['Draft', 'Published', 'Private', 'Suspended', 'Trash Bin'], default: 'Draft', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Article', ArticleSchema);
