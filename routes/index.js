const express = require('express');
const router = express.Router();

// console message for testing 
console.log('router loaded');

const homeController = require('../controllers/homeController.js');

router.get('/',homeController.home);

module.exports = router;