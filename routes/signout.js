const express = require('express');
const router = express.Router();

const signOutController = require('../controllers/sign_out.js');

router.get('/',signOutController.signOut);

module.exports = router;