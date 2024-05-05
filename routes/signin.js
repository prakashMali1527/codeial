const express = require('express');
const router = express.Router();

const signInController = require('../controllers/sign_in_controller');

router.get('/', signInController.signIn);
router.post('/create-session', signInController.createSession);

module.exports = router;