'use strict'

var bcrypt = require('bcrypt-nodejs');

//modelos
var Local = require('../models/local');

var jwt = require('../services/jwt');

function prueba_local(req, res){
    console.log('prueba correcta');
    res.status(200).send({
        message: 'Prueba de Controlador de Local y su ruta'
    });
}

function buscar_local(req, res){
    //Recoger los Parametros de la Peticion
    var local = new Local();
    var params = req.query;
    local._id = params._id;

    console.log(req.query._id);

    Local.findOne({ _id: local._id}, (err,local_encontrado) => {
        if(err){
            res.status(500).send({message: 'Error'+err})
        }else{
            if(!local_encontrado){
                res.status(404).send({message: 'Local no Encontrado'})
            }else{
                res.status(200).send(local_encontrado);
            }
        }
    });
}