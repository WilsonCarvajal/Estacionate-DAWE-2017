'use strict';
import {Estacionamiento} from "../../src/app/models/estacionamiento";

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

function agregarEstacionamientos(req, res) {
    const params = req.body;
    const direccion = params.direccion;
    const numeroEst = params.cantidadEstacionamientos;
    const metrosCuadrados = params.metrosCuadrados;

    Local.findOne({ direccion:direccion}, (err, local_encontrado) => {
        if(err) {
            res.status(500).send({message: 'Error'+err});
        } else {
            if(!local_encontrado) {
                res.stat(404).send({message: 'Local no encontrado'});
            } else {
                console.log('Local encontrado' + local_encontrado);
                for(i = 0; i < numeroEst; i++) {
                    let estacionamiento = new Estacionamiento();
                    estacionamiento.estado = 'libre'; // se deja el estacionamiento libre
                    estacionamiento.metrosCuadrados = metrosCuadrados;
                    estacionamiento.local = local_encontrado;
                    // desde aqui se guarda el estacionamiento y se hace las relaciones
                    estacionamiento.save((err, estacionamiento_guardado) => {
                        if(err) {
                            res.status(500).send({
                                message: 'Error al Guardar Local' +err
                            });
                        } else {
                            if(!estacionamiento_guardado) {
                                res.status(404).send({
                                    message: 'No se ha Guardado el estacionamiento'
                                });
                            } else {
                                local_encontrado.estacionamientos.push(estacionamiento_guardado);

                                local_encontrado.save(function (err, updateObject) {
                                    if(err) {
                                        res.status(500).send({message: 'Error'+err});
                                    } else {
                                        console.log('Se guardo el estacionamiento al local');
                                    }
                                })
                            }
                        }
                    })
                }
                res.status(200).send(
                    {message: 'Estacionamientos guardados'}
                );
            }
        }
    })
}
module.exports = {
    prueba_local,
    guardar_local,
    buscar_locales_por_coordenadas,
    agregarEstacionamientos
};