'use strict'

var mongoose = require('mongoose');
var jwt = require('../services/jwt');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    // rut: {
    //     type: Number,
    //     unique: 'error testeando Rut',
    //     required: 'Porfavor, Ingresa tu Rut',
    //     trim: true
    // },
    rut: Number,
    contrasenia: String,
    nombre: String,
    apellidoPaterno: String,
    apellidoMaterno: String,
    email: {
        type: String,
        unique: 'error testeando email',
        required: 'Porfavor, Ingresa tu email',
        lowercase: true
    },
    direccion: String,
    locales:  [{ "type": Schema.Types.ObjectId, "ref": "Local" }],
    rol: { type: String, lowercase: true },
    autos:  [{ "type": Schema.Types.ObjectId, "ref": "Auto" }],
    idFacebook: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);