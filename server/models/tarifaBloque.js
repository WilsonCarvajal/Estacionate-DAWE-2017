/**
 * Created by Wizao on 05-11-2017.
 */
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TarifaBloqueSchema = Schema({
    horario: [{ inicio: Date, termino: Date }],
    valor:  {
        type: Number,
        min: [0, 'No puede ser menor o igual a 0']
    },
    local: { "type": Schema.Types.ObjectId, "ref": "Local"},
});

module.exports = mongoose.model('TarifaBloque', TarifaBloqueSchema);