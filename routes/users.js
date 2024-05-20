const express = require('express');
const router = express.Router();
const app = express();
const usersController = require('../controllers/users_controller');
const signInController = require('../controllers/sign_in_controller');
const passport = require('passport');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.get('/posts', usersController.posts);
router.get('/friends', usersController.friends);
router.get('/destroy-session', usersController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/signIn'}),signInController.createSession);

module.exports = router;