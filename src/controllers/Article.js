const mongoose = require('mongoose');
const Article = require('../models/Article');

const createArticle = (req, res, next) => {
  const { title, author } = req.body;
  const article = new Article({
    _id: new mongoose.Types.ObjectId(),
    title,
    author
  });
  return article
    .save()
    .then((article) => res.status(201).json({ article }))
    .catch((err) => res.status(500).json({ err }));
};

const readArticle = (req, res, next) => {
  const articleId = req.params.articleId;
  return Article.findById(articleId)
    .populate('author')
    .then((article) => (article ? res.status(200).json({ article }) : res.status(404).json({ message: 'Not Found' })))
    .catch((err) => res.status(500).json({ err }));
};

const readAllArticles = (req, res, next) => {
  return Article.find()
    .populate('author')
    .then((articles) => res.status(200).json({ articles }))
    .catch((err) => res.status(500).json({ err }));
};
const updateArticle = (req, res, next) => {
  const articleId = req.params.articleId;
  return Article.findById(articleId)
    .then((article) => {
      if (article) {
        article.set(req.body);
        return article
          .save()
          .then((article) => res.status(201).json({ article }))
          .catch((err) => res.status(500).json({ err }));
      } else {
        res.status(404).json({ message: 'Not Found' });
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

const deleteArticle = (req, res, next) => {
  const articleId = req.params.articleId;
  return Article.findByIdAndDelete(articleId)
    .then((article) => (article ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not Found' })))
    .catch((err) => res.status(500).json({ err }));
};

module.exports = { createArticle, readArticle, readAllArticles, updateArticle, deleteArticle };
