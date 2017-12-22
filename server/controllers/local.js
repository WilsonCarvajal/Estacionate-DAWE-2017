'use strict'

var bcrypt = require('bcrypt-nodejs');
//modelos
var Local = require('../models/local');
var jwt = require('../services/jwt');
let Estacionamiento = require ('../models/estacionamiento');

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
        if (err) {
            res.status(500).send({message: 'Error' + err})
        } else {
            //Se cambia la direccion
            local.direccion = req.body.direccion || local.direccion;
            //UPDATE DATABASE
            local.save((err, local_encontrado) => {
                if (!local_encontrado) {
                    res.status(404).send({message: 'No se encontró el local'})
                } else {
                    res.status(200).send(local_encontrado);
                }
            });
        }
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
    local.estacionamientos = [];
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
                local_encontrado.cantidadEstacionamientos = numeroEst;
                local_encontrado.cantidadDisponible = numeroEst;
                console.log('Local encontrado' + local_encontrado);
                for(let i = 0; i < numeroEst; i++) {
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
                                console.log('estacionamiento guardado')
                            }
                        }
                    });
                    local_encontrado.estacionamientos = local_encontrado.estacionamientos.concat([estacionamiento]);
                    local_encontrado.save((err, estacionamiento_guardado) => {
                        if(err) {
                            console.log('error: ' + err);
                        } else {
                            if(!estacionamiento_guardado) {
                                console.log('error');
                            } else {
                                console.log('guardado');
                            }
                        }
                    });
                }
                res.status(200).send(
                    {message: 'Estacionamientos guardados'}
                );
            }
        }
    })
}

function pushEstacionamiento(estacionamiento, local) {
    local.estacionamientos = local.estacionamientos.concat([estacionamiento]);
    local.save((err, estacionamiento_guardado) => {
        if(err) {
            console.log('error: ' + err);
        } else {
            if(!estacionamiento_guardado) {
                console.log('error');
            } else {
                console.log('guardado');
            }
        }
    });
}
module.exports = {
    prueba_local,
    guardar_local,
    buscar_locales_por_coordenadas,
    agregarEstacionamientos
};
