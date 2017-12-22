/**
 * Created by Wizao on 05-11-2017.
 */
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AutoSchema = Schema({
    patente: { type: String, lowercase: true },
    color: { type: String, lowercase: true },
    fabricante: String,
    modelo: String,
    metrosCuadrado: {
        type: Number,
        min: [0, 'No puede tener Metros cuadrados menor o igual a 0']
    },
    dueño:  [{ "type": Schema.Types.ObjectId, "ref": "Usuario" }],

});

module.exports = mongoose.model('Auto', AutoSchema);