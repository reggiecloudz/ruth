const express = require('express');
const controller = require('../controllers/Article');

const router = express.Router();

router.post('/create', controller.createArticle);
router.get('/get/:articleId', controller.readArticle);
router.get('/get', controller.readAllArticles);
router.patch('/update/:articleId', controller.updateArticle);
router.delete('/delete/:articleId', controller.deleteArticle);

module.exports = router;
