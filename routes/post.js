const express = require('express');
const router = express.Router();

const postController = require('../controllers/post_controller');

const passport = require('../config/passport-local-strategy'); 

router.post('/create',postController.createPost);

router.get('/destroy/:id',postController.destroy);

module.exports = router;