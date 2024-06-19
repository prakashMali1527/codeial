const router = require('express').Router();

const likeController = require('../controllers/like_controller');

router.get('/toggle',likeController.toggleLike);

module.exports = router;