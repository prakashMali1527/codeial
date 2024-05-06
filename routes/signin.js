const express = require('express');
const router = express.Router();
const passport = require('passport');

const signInController = require('../controllers/sign_in_controller');

router.get('/', signInController.signIn);

// use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/signin'},
), signInController.createSession);

module.exports = router;