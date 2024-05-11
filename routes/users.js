const express = require('express');
const router = express.Router();
const app = express();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.get('/posts', usersController.posts);
router.get('/friends', usersController.friends);
router.get('/destroy-session', usersController.destroySession);

module.exports = router;