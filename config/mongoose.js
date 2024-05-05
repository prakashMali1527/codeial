// require library
const mongoose = require('mongoose');

// open connection
mongoose.connect('mongodb://localhost/codeil_development');

// acquire connection to check if it is working
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

// on connecting
db.once('open', function () {
    console.log('Successfully connected to Database :: MongoDB');
});

module.exports = db;
