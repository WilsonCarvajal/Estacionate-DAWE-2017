/**
 * Created by Wizao on 05-11-2017.
 */
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TiempoUsoSchema = Schema({
    horario: [{ horaEntrada: Date, holaSalida: Date }],
    totalPago:  {
        type: Number,
        min: [0, 'No puede tener Metros cuadrados menor o igual a 0']
    },
    local: { "type": Schema.Types.ObjectId, "ref": "Estacionamiento"},
    auto: { "type": Schema.Types.ObjectId, "ref": "Auto"},
    pago: { "type": Schema.Types.ObjectId, "ref": "Pago"},

});

module.exports = mongoose.model('TiempoUso', TiempoUsoSchema);