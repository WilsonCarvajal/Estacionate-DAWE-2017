'use strict'

var mongoose = require('mongoose');
var jwt = require('../services/jwt');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    // rut: {
    //     type: Number,
    //     unique: 'error testeando rut',
    //     required: 'No se registró un rut',
    //     trim: true
    // },
    email: { type: String,
        lowercase: true,
        unique: 'error testeando email',
        required: 'No se registró un email',
    },
    rut: String,
    contrasenia: String,
    nombre: String,
    apellidoPaterno: String,
    apellidoMaterno: String,
    // email: String,

    direccion: String,
    locales:  [{ "type": Schema.Types.ObjectId, "ref": "Local" }],
    rol: { type: String, lowercase: true },
    autos:  [{ "type": Schema.Types.ObjectId, "ref": "Auto" }],
});

module.exports = mongoose.model('Usuario', UsuarioSchema);