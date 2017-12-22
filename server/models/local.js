/**
 * Created by Wizao on 05-11-2017.
 */
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocalSchema = Schema({
    x: Number,
    y: Number,
    direccion: String,
    cantidadDisponible: {
        type: Number,
        min: [0, 'No puede tener una cantidad disponible menor a 0']
    },
    cantidadEstacionamientos: {
        type: Number,
        min: [0, 'No puede tener una cantidad disponible menor a 0']
    },
    nombre: String,
    duenio: { "type": Schema.Types.ObjectId, "ref": "Usuario"},
    estacionamientos:  [{ "type": Schema.Types.ObjectId, "ref": "Estacionamiento" }],
    tarifaBloque:  [{ "type": Schema.Types.ObjectId, "ref": "TarifaBloque" }],

});

module.exports = mongoose.model('Local', LocalSchema);