const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const Usuario = require('../models/usuario');

app.post('/usuario', function (req, res) {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 12),
        //password: body.password,
        role: body.role
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password= null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.get('/usuario', function (req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    let estado = req.query.estado || true;



    Usuario.find({estado}, 'nombre email role google  img  estado')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count({estado}, (err, conteo) =>
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                })
            );


        })

});

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


});
app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let cambiaestado ={
        estado:false
    };

    Usuario.findByIdAndUpdate(id, cambiaestado, {new: true, runValidators: true}, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});


/* Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
     if (err) {
         return res.status(400).json({
             ok: false,
             err
         });
     };
     if (usuarioBorrado==null){
         return res.status(400).json({
             ok: false,
             err:{
                 mensaje:'usuario no encontrado'
             }
         });
     }
     res.json({
         ok: true,
         usuario: usuarioBorrado
     });
 });*/


module.exports = app;