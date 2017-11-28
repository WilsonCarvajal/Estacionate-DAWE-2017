/**
 * Created by Tomás on 21-11-2017.
 */
//modelos
var Usuario = require('../models/usuario');

function upgradeAdmin(req, res) {
    const params = req.body;
    const rut = params.rut;

    Usuario.findOne({rut: rut}, (err,usuario_encontrado) => {
        if(err){
            res.status(500).send({message: 'Error'+err})
        }else{
            if(!usuario_encontrado){
                res.status(404).send({message: 'Usuario no Encontrado'})
            }else{
                usuario_encontrado.rol = 'admin';

                usuario_encontrado.save(function (err, updajeObject) {
                    if(err){
                        res.status(500).send({message: 'Error'+err});
                    } else {
                        res.status(200).send(updajeObject);
                    }
                })
            }
        }
    });
}

module.exports = {
    upgradeAdmin,
};