// require express library 
const express = require('express');
const port = 8000;

// fire the express
const app = express();

//middleware to handle routes
app.use('/', require('./routes/index'));

// listening on port: 8000
app.listen(port, function (err) {
    if (err) {
        console.log(`Error running the server: ${err}`);
    } else {
        console.log(`Server is up and running on PORT: ${port}`);
    }
});
