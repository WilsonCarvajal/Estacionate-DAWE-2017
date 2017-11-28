/**
 * Created by Wizao on 05-11-2017.
 */
'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();



//middlewares de body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//cargar rutas
var usuario_routes = require('./server/routes/usuario');


// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));


//Ruta Base
app.use('/api', usuario_routes);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//rutas body-parser



module.exports = app;