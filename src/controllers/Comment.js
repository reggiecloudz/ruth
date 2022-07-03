const mongoose = require('mongoose');
const Comment = require('../models/Comment');

const createComment = (req, res, next) => {
  const { content } = req.body;
  const comment = new Comment({
    _id: new mongoose.Types.ObjectId(),
    content
  });
  //req.io.of('/').emit('new-comment', { content: req.body.content });

  return comment
    .save()
    .then((comment) => res.status(201).json({ comment }))
    .catch((err) => res.status(500).json({ err }));
};

const readComment = (req, res, next) => {
  const commentId = req.params.commentId;
  return Comment.findById(commentId)
    .then((comment) => (comment ? res.status(200).json({ comment }) : res.status(404).json({ message: 'Not Found' })))
    .catch((err) => res.status(500).json({ err }));
};

const readAllComments = (req, res, next) => {
  return Comment.find()
    .then((comments) => res.status(200).json({ comments }))
    .catch((err) => res.status(500).json({ err }));
};
const updateComment = (req, res, next) => {
  const commentId = req.params.commentId;
  return Comment.findById(commentId)
    .then((comment) => {
      if (comment) {
        comment.set(req.body);
        return comment
          .save()
          .then((comment) => res.status(201).json({ comment }))
          .catch((err) => res.status(500).json({ err }));
      } else {
        res.status(404).json({ message: 'Not Found' });
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

const deleteComment = (req, res, next) => {
  const commentId = req.params.commentId;
  return Comment.findByIdAndDelete(commentId)
    .then((comment) => (comment ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not Found' })))
    .catch((err) => res.status(500).json({ err }));
};

module.exports = {
  createComment,
  readComment,
  readAllComments,
  updateComment,
  deleteComment
};
