/**
 * Created by Wizao on 05-11-2017.
 */
'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');
const mdAuth = require('../../../../DAWE/Estacionate-DAWE-2017/server/midleware/autenticator');
var passportFacebook = require('passport'),
    facebookStrategy = require('passport-facebook');

var api = express.Router();

api.get('/prueba', mdAuth.ensureAuth, UsuarioController.prueba_usuario);
api.post('/registro', UsuarioController.guardar_usuario);
api.get('/buscar', mdAuth.ensureAuth, UsuarioController.buscar_usuario);
api.post('/iniciarSesion', UsuarioController.inicio_sesion);
api.post('/login',UsuarioController.login);
api.get('/registrar-facebook',passportFacebook.authenticate('facebook'));
api.get('/auth/facebook/callback/',passportFacebook.authenticate('facebook',
    { successRedirect: 'http://localhost:4200/',
        failureRedirect: 'http://localhost:4200/login' }));

passportFacebook.use(new facebookStrategy({
        clientID: '1849209735108263',
        clientSecret: '4b967610104a42ce7841eeec2e785795',
        callbackURL: '/auth/facebook/callback/',
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        UsuarioController.registrarFacebook(accessToken, refreshToken, profile, done);
    }
));

module.exports = api;