// require library 
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const User = require('./models/user');
const Post = require('./models/post');
const port = 8000;
const removeInactiveAccount = require('./workers/remove_inactive_account');

// used for session and passport authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT =  require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');

const cookieParser = require('cookie-parser');

const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// fire the express
const app = express();
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: false,   // set true if you want to debug scss
    outputStyle: 'expanded',
    prefix: '/CSS'
}));

// parses data from POST request
app.use(express.urlencoded());
// parse cookies data
app.use(cookieParser());

// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set static files
app.use(express.static('./assets'));
// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname+'/uploads'));
// set express layouts 
app.use(expressLayouts);

// Mongo Store is used to store the session cookie in db
app.use(session({
    name: 'codeial',
    // TODO change secret key before deployment
    secret: 'blahblahblahsometing',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100) // 10 minute session
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_development'
        },
        function(err){
            console.log(err || 'connect-mongodb set up ok!!')
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

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
