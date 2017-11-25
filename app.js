/**
 * Created by Wizao on 05-11-2017.
 */
'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');

var app = express();

//PASSPORT FACEBOOK
app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user); // req.user
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});


//middlewares de body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//cargar rutas
var usuario_routes = require('./server/routes/usuario');


// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));


//Ruta Base
app.use(usuario_routes);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
//rutas body-parser

// require('./server/passport')(app);

module.exports = app;