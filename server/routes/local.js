'use strict'

let express = require('express');

let LocalController = require('../controllers/local');
let api = express.Router();

api.post('/registro_local', LocalController.guardar_local);
api.post('/buscar_local', LocalController.buscar_locales_por_coordenadas);
api.get('/prueba_local', LocalController.prueba_local);
api.get('/agregar_estacionamiento', LocalController.agregarEstacionamientos);

module.exports = api;