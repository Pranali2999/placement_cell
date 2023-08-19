const express = require('express');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const app = express();
const port = 8000;
const env = require('./config/environment');
const expressLayouts = require('express-ejs-layouts');
const logger = require('morgan');
const path = require('path'); 
const db = require('./config/mongoose');
const session = require('express-session');
const passportLocal = require('./config/passport-local-startegy');
const bcrypt = require('bcrypt');
const MongoStore = require('connect-mongo');
require('connect-mongo').debug = true;

const flash = require('connect-flash');
const passport = require('passport');
const sassMiddleware = require('node-sass-middleware');
const customMware = require('./config/middleware');

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

if (env.name == 'development') {
    app.use(
        sassMiddleware({
            src: path.join(__dirname, env.asset_path, 'scss'),
            dest: path.join(__dirname, env.asset_path, 'css'),
            debug: true,
            outputStyle: 'extended',
            prefix: '/css',
        })
    );
}

app.use(express.static(env.asset_path));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codial',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    store: new MongoStore({
        mongoUrl: 'mongodb://localhost/mp_development',
        autoRemove: 'disabled'
    }),
}));

app.use(logger(env.morgan.mode, env.morgan.options));

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Move flash middleware after session middleware
app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes'));

app.listen(port, function (error) {
    if (error) {
        console.log(`Error in connecting to server: ${error}`);
        return;
    }
    console.log(`Server running on port: ${port}`);
});
