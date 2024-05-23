const express = require('express');
const router = express.Router();
const passport = require('passport');

const resetPasswordController = require('../controllers/reset_password');

router.get('/', passport.checkUnauthentication ,resetPasswordController.resetPasswordGet);

router.post('/',passport.checkUnauthentication ,resetPasswordController.resetPasswordPost);

module.exports = router;