/**
 * Created by Wizao on 05-11-2017.
 */
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PagoSchema = Schema({
    tipo: String,
    fecha: Date,
    tiempoUso: { "type": Schema.Types.ObjectId, "ref": "TiempoUso"},
});

module.exports = mongoose.model('Pago', PagoSchema);