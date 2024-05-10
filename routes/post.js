const express = require('express');
const router = express.Router();

const postController = require('../controllers/post_controller');

const passport = require('../config/passport-local-strategy'); 

// comments authentication 
router.post('/create-comment', passport.checkAuthentication, postController.createComment);

router.post('/create',postController.createPost);

router.get('/destroy/:id',postController.destroy);

module.exports = router;