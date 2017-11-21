/**
 * Created by Wizao on 05-11-2017.
 */
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EstacionamientoSchema = Schema({
    estado: { type: String, lowercase: true },
    metrosCuadrados:  {
        type: Number,
        min: [0, 'No puede tener Metros cuadrados menor o igual a 0']
    },
    local: { "type": Schema.Types.ObjectId, "ref": "Local"},
});

module.exports = mongoose.model('Estacionamiento', EstacionamientoSchema);