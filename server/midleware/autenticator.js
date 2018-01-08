'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var claveSecreta = process.env.clave || 'Esto es la Clave para DAWE';

exports.ensureAuth = function (req, res, next) {

    if(!req.headers.authorization){
        return res.status(403).send({message: 'La peticion no tiene cabecera de atenticacion'})
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try{
        var payload = jwt.decode(token, claveSecreta);

        if(payload.sub && payload.exp <= moment().unix()){
            return res.status(401).send({
                message: 'El Token ha Expirado'
            });
        }
    }catch(ex){
        return res.status(404).send({
            message: 'El Token no es valido'
        });
    }

    req.usuario = payload;
    next();

};