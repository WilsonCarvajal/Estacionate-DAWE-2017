'use strict';

let express = require('express');

let LocalController = require('../controllers/local');
const mdAuth = require('../midleware/autenticator');
let api = express.Router();


api.post('/registro_local', mdAuth.ensureAuth,LocalController.guardar_local);
api.post('/buscar_local', LocalController.buscar_locales_por_coordenadas);
api.get('/prueba_local', mdAuth.ensureAuth,LocalController.prueba_local);
api.post('/agregar_estacionamiento', mdAuth.ensureAuth,LocalController.agregarEstacionamientos);

module.exports = api;