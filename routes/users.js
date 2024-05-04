const express = require('express');
const router = express.Router();
const app = express();
const usersController = require('../controllers/users_controller');

router.get('/profile',usersController.profile);
router.get('/post',usersController.post);
router.get('/friends',usersController.friends);

module.exports = router;