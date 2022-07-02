const express = require('express');
const controller = require('../controllers/Comment');

const router = express.Router();

router.post('/create', controller.createComment);
router.get('/get/:commentId', controller.readComment);
router.get('/get', controller.readAllComments);
router.patch('/update/:commentId', controller.updateComment);
router.delete('/delete/:commentId', controller.deleteComment);

module.exports = router;
