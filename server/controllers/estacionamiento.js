'use strict'

var bcrypt = require('bcrypt-nodejs');

//modelos
var Estacionamiento = require('../models/estacionamiento');

var jwt = require('../services/jwt');

function prueba_estacionamiento(req, res){
    console.log('prueba correcta');
    res.status(200).send({
        message: 'Prueba de Controlador de Estacionamiento y su ruta'
    });
}

function buscar_estacionamiento(req, res){
    //Recoger los Parametros de la Peticion
    var estacionamiento = new Estacionamiento();
    var params = req.query;
    estacionamiento._id = params._id;

    console.log(req.query._id);

    Estacionamiento.findOne({ _id: estacionamiento._id}, (err,estacionamiento_encontrado) => {
        if(err){
            res.status(500).send({message: 'Error'+err})
        }else{
            if(!estacionamiento_encontrado){
                res.status(404).send({message: 'Estacionamiento no Encontrado'})
            }else{
                res.status(200).send(estacionamiento_encontrado);
            }
        }
    });
}