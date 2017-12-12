/**
 * Created by Wizao on 05-11-2017.
 */
'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');
const mdAuth = require('../../../../DAWE/Estacionate-DAWE-2017/server/midleware/autenticator');

var api = express.Router();

api.get('/prueba', mdAuth.ensureAuth, UsuarioController.prueba_usuario);
api.post('/registro', UsuarioController.guardar_usuario);
api.get('/buscar', UsuarioController.buscar_usuario);
api.post('/iniciarSesion', UsuarioController.inicio_sesion);

module.exports = api;