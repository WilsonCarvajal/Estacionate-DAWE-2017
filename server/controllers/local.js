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

/* MODIFICAR NOMBRE DE UN LOCAL */
function modificar_nombre_local(req,res){

    //Recoger los Parametros de la Peticion
    var local = new Local();
    var params = req.query;
    local._id = params._id;

    //console.log(req.query._id);

    Local.findById(req.params.local_id, (err,local) => {
        if(err){
            res.status(500).send({message: 'Error'+err})
        }else{
            //Se cambia el nombre
            local.nombre = req.body.nombre || local.nombre;
            //UPDATE DATABASE
            local.save((err,local_encontrado) => {
                if(!local_encontrado){
                    res.status(404).send({message: 'No se encontró el local'})
                }else{
                    res.status(200).send(local_encontrado);
                }
            });
        }
    });
}

/* MODIFICAR DIRECCION DE UN ESTACIONAMIENTO */
function modificar_direccion_local(req,res){

    //Recoger los Parametros de la Peticion
    var local = new Local();
    var params = req.query;
    local._id = params._id;

    console.log(req.query._id);

    Local.findById(req.params.local_id, (err,local) => {
        if(err){
            res.status(500).send({message: 'Error'+err})
        }else{
            //Se cambia la direccion
            local.direccion = req.body.direccion || local.direccion;
            //UPDATE DATABASE
            local.save((err,local_encontrado) => {
                if(!local_encontrado){
                    res.status(404).send({message: 'No se encontró el local'})
                }else{
                    res.status(200).send(local_encontrado);
                }
            });
        }
    });
}

function actualizar_coordenadas(req,res){
    var local = new Local();
    var params = req.query;
    local._id = params._id;

    console.log(req.query._id);

    Local.findById(req.params.local_id, (err,local) => {
        if(err){
            res.status(500).send({message: 'Error'+err})
        }else{
            //Se cambian las coordenadas
            local.x = req.body.x || local.x;
            local.y = req.body.y || local.y;
            //UPDATE DATABASE
            local.save((err,local_encontrado) => {
                if(!local_encontrado){
                    res.status(404).send({message: 'No se encontró el local'})
                }else{
                    res.status(200).send(local_encontrado);
                }
            });
        }
    });
}

function actualizar_cantidad_disponible(req){

    var local = new Local();
    var params = req.query;
    local._id = params._id;

    Local.findByIdAndUpdate(local._id, {
        $set:{
            cantidadDisponible: local.cantidadDisponible
        }
    }, function(err, local){
        if(err){
            noModificado(true);
            return;
        }
        if(!local){
            modificado(false);
            return;
        }else{
            modificado(local);
            return;
        }
    })
}

module.exports = {
    prueba_local,
    buscar_local,
    modificar_nombre_local,
    modificar_direccion_local,
    actualizar_cantidad_disponible,
    actualizar_coordenadas
}