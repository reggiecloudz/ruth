import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Article from '../models/Article';

const createArticle = (req: Request, res: Response, next: NextFunction) => {
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

const readArticle = (req: Request, res: Response, next: NextFunction) => {
  const articleId = req.params.articleId;

  return Article.findById(articleId)
    .populate('author')
    .then((article) => (article ? res.status(200).json({ article }) : res.status(404).json({ message: 'Not Found' })))
    .catch((err) => res.status(500).json({ err }));
};

const readAllArticles = (req: Request, res: Response, next: NextFunction) => {
  return Article.find()
    .populate('author')
    .then((articles) => res.status(200).json({ articles }))
    .catch((err) => res.status(500).json({ err }));
};

const updateArticle = (req: Request, res: Response, next: NextFunction) => {
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

const deleteArticle = (req: Request, res: Response, next: NextFunction) => {
  const articleId = req.params.articleId;

  return Article.findByIdAndDelete(articleId)
    .then((article) => (article ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not Found' })))
    .catch((err) => res.status(500).json({ err }));
};

export default { createArticle, readArticle, readAllArticles, updateArticle, deleteArticle };
