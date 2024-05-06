const express = require('express');
const router = express.Router();

const signUpController = require('../controllers/sign_up_controller.js');
const passport = require('passport');

router.get('/',passport.checkUnauthentication,signUpController.signUp);

router.post('/create-user',signUpController.createUser);

module.exports = router;
