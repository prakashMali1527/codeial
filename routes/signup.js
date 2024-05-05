const express = require('express');
const router = express.Router();

const signUpController = require('../controllers/sign_up_controller.js');

router.get('/', signUpController.signUp);

router.post('/create-user',signUpController.createUser);

module.exports = router;
