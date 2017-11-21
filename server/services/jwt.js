/**
 * Created by Wizao on 20-11-2017.
 */
'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var claveSecreta = process.env.clave || 'Esto es la Clave para DAWE';

exports.createToken = function(usuario){
    var payload = {
        sub: usuario._id,
        nombre: usuario.nombre,
        rut: usuario.rut,
        apellidoPaterno: usuario.apellidoPaterno,
        apellidoMaterno: usuario.apellidoMaterno,
        email: usuario.email,
        direccion: usuario.direccion,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix
    };

    return jwt.encode(payload, claveSecreta);
};