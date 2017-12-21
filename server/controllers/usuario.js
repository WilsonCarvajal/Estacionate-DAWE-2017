/**
 * Created by Wizao on 05-11-2017.
 */
'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');

//modelos
var Usuario = require('../models/usuario');

var jwt = require('../services/jwt');

function prueba_usuario(req, res){
    console.log('prueba correcta');
    res.status(200).send({
        message: 'Prueba de Controlador de Usuario y su ruta'
    });
}

function inicio_sesion(req, res){
    //Recoger los Parametros de la Peticion

    var params = req.body;
    var rut = params.rut;
    var contrasenia = params.contrasenia;
    //console.log(req.query.rut);

    Usuario.findOne({ rut: rut}, (err,usuario_encontrado) => {
        if(err){
            res.status(500).send({message: 'Error'+err})
        }else{
            if(!usuario_encontrado){
                res.status(404).send({message: 'Usuario no Encontrado'})
            }else{
                console.log('Comparando Contraseñas '+contrasenia+ ' de ' +usuario_encontrado.nombre);
                bcrypt.compare(contrasenia, usuario_encontrado.contrasenia, (err,check) =>{
                    if(check){
                        //Devolver y Generar Token
                        if(params.get){
                            res.status(200).send({
                                token: jwt.createToken(usuario_encontrado)
                            });
                        }else{
                            res.status(200).send(usuario_encontrado);
                        }
                        res.status(200).send({message: 'Ingreso Correcto'});
                    }else{
                        res.status(400).send({
                            message:'La contraseña es incorrecta'
                        });
                    }
                });

            }
        }
    });

}

function buscar_usuario(req, res){
    //Recoger los Parametros de la Peticion
    var usuario = new Usuario();
    var params = req.query;
    usuario.email = params.email;

    //console.log(req.query.rut);

    Usuario.findOne({ email: usuario.email}, (err,usuario_encontrado) => {
        if(err){
            res.status(500).send({message: 'Error'+err})
        } else {
            if(!usuario_encontrado){
                res.status(404).send({message: 'Usuario no encontrado'})
            }else{
                res.status(200).send(usuario_encontrado);
            }
        }
    });

}
function modificar_usuario(req, res) {
    var usuario = new Usuario();
    var params = req.body;
    var id;
    usuario.rut = params.rut;
    usuario.nombre = params.nombre;
    usuario.apellido_paterno = params.apellido_paterno;
    usuario.apellido_materno = params.apellido_materno;
    usuario.email = params.email;
    usuario.direccion = params.direccion;
    usuario.locales = params.locales;
    usuario.autos = params.autos;
    usuario.rol = params.rol;

    Usuario.findOne({ email: usuario.email}, (err,usuario_encontrado) => {
        if(err){
            res.status(500).send({message: 'Error '+err})
        } else {
            if(!usuario_encontrado){
                res.status(404).send({message: 'Usuario no encontrado'})
            }else{
                // res.status(200).send(usuario_encontrado);
                id = usuario_encontrado._id;
                Usuario.findByIdAndUpdate(id,
                    {
                        $set: {email: req.body.email, nombre: usuario.nombre, apellido_paterno:
                            usuario.apellido_paterno, apellido_materno: usuario.apellido_materno,
                            direccion: usuario.direccion, locales: usuario.locales, autos: usuario.autos,
                            rol: usuario.rol
                        }
                    },
                    {
                        new: true
                    },
                    function(err, usuarioActualizado) {
                        if (err) {
                            res.send("Error actualizando usuario" + err)
                        } else {
                            res.json(usuarioActualizado)
                        }
                    });
            }
        }
    });

}

function guardar_usuario(req, res){
    // Crear Objeto Usuario
    var usuario = new Usuario();

    // Recoger los Parametros de la Peticion
    var params = req.body;
    usuario.rut = params.rut;
    usuario.nombre = params.nombre;
    usuario.apellido_paterno = params.apellido_paterno;
    usuario.apellido_materno = params.apellido_materno;
    usuario.email = params.email;
    usuario.direccion = params.direccion;
    usuario.locales = null;
    usuario.autos = null;
    usuario.rol = null;

    bcrypt.hash(params.contrasenia, null, null, function(err,hash){
        usuario.contrasenia = hash;
    });

    usuario.save((err, usuario_guardado) => {
        if(err){
            res.status(500).send({
                message: 'Error al guardar usuario' +err
            });
        }else{
            if(!usuario_guardado){
                res.status(404).send({
                    message: 'No se ha guardado el usuario'
                });
            }else{
                res.status(200).send({usuario: usuario_guardado})
            }
        }
    });
}

module.exports = {
    prueba_usuario,
    guardar_usuario,
    buscar_usuario,
    inicio_sesion,
    modificar_usuario
}