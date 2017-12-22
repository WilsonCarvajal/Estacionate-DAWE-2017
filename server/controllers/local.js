'use strict'

let Local = require('../models/local');

function prueba_local(req, res){
    console.log('prueba correcta');
    res.status(200).send({
        message: 'Prueba de Controlador de Local'
    });
}

function buscar_locales_por_coordenadas(req, res){
    //Recoger los Parametros de la Peticion
    let local = new Local();
    let params = req.body   ;
    local.x = params.latitude;
    local.y = params.longitude;

    //console.log(local.x);
    //console.log(local.y);

    let low_x = local.x-0.5;
    let high_x = local.x+0.5;
    let low_y = local.y-0.5;
    let high_y = local.y+0.5;

    Local.find({
            x: {$gt: low_x, $lt: high_x},
            y: {$gt: low_y, $lt: high_y}},
        (err,local_encontrado) => {
            if(err){
                res.status(500).send({message: 'Error'+err})
            }else{
                if(!local_encontrado){
            res.status(404).send({message: 'No hay locales en la ubicación'})
                }else{
                    res.status(200).send(local_encontrado);
                }
            }
    });
}

function guardar_local(req, res){
    //Crear Objeto Usuario
    let local = new Local();

    //Recoger los Parametros de la Peticion
    let params = req.body;
    local.direccion = params.direccion;
    local.x = params.x;
    local.y = params.y;
    local.cantidadDisponible = 0;
    local.cantidadEstacionamientos = 0;
    local.nombre = params.nombre;
    local.duenio = null;
    local.estacionamientos = null;
    local.tarifaBloque = null;

    local.save((err, local_guardado) => {
        if(err){
            res.status(500).send({
                message: 'Error al Guardar Local' +err
            });
        }else{
            if(!local_guardado){
                res.status(404).send({
                    message: 'No se ha Guardado el Local'
                });
            }else{
                res.status(200).send({local: local_guardado})
            }
        }
    });
}

module.exports = {
    prueba_local,
    guardar_local,
    buscar_locales_por_coordenadas
}