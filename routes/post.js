const express = require('express');
const router = express.Router();

const postController = require('../controllers/post_controller');

router.post('/create-comment',postController.createComment);

router.post('/create',postController.createPost);

module.exports = router;