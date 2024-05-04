const express = require('express');
const router = express.Router();

// console message for testing 
console.log('router loaded');

const homeController = require('../controllers/home_controller.js');
const loginController = require('../controllers/login_controller.js');
const signUpController = require('../controllers/sign_up_controller.js');

router.get('/', homeController.home);
router.get('/SignUp', signUpController.signup);
router.get('/Login', loginController.login);
router.use('/users', require('./users.js'));
// for any further route access from here
// router.use('/routerName',require('./routerFile'));

module.exports = router;