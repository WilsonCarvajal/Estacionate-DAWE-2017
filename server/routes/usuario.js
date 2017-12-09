/**
 * Created by Wizao on 05-11-2017.
 */
'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');
var passportFacebook = require('passport'),
    facebookStrategy = require('passport-facebook');

var api = express.Router();

api.get('/prueba', UsuarioController.prueba_usuario);
api.post('/registro', UsuarioController.guardar_usuario);
api.get('/buscar', UsuarioController.buscar_usuario);
api.post('/iniciarSesion', UsuarioController.inicio_sesion);
api.get('/registrar-facebook',passportFacebook.authenticate('facebook',{authType: 'rerequest',scope : ['email']}));
api.get('/auth/facebook/callback/',passportFacebook.authenticate('facebook',
    { failureRedirect: 'http://localhost:4200/login' }),
    UsuarioController.callback);
api.get('/buscar-facebook/:id', UsuarioController.buscarFacebook);

passportFacebook.use(new facebookStrategy({
        clientID: '1849209735108263',
        clientSecret: '4b967610104a42ce7841eeec2e785795',
        callbackURL: '/api/auth/facebook/callback/',
        profileFields: ['id', 'displayName', 'email']
    },
    function (accessToken, refreshToken, profile, done) {
        // console.log(profile);
        UsuarioController.registrarFacebook(accessToken, refreshToken, profile, done);
    }
));

module.exports = api;