const express = require('express');
const app = express();
const Usuario = require('../models/usuarios');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificarToken, verificarRol } = require('../middlewares/autenticacion');

app.get('/usuario', verificarToken, (req, res) => {

    let desde = req.query.desde || 0;
    let limite = req.query.limite || 10;

    Usuario.find({ estado: true }, 'nombre email role estado' )
            .skip( Number(desde) )
            .limit( Number(limite))
            .exec((err, usuarios) => {
                if ( err ){
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }
                res.json({
                    ok: true,
                    usuarios
                })
            })
});

app.post('/usuario', [verificarToken, verificarRol], (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save( (err, usuarioDB) => {
        if ( err ){
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    } )
    // res.json( body );
});

app.put('/usuario/:id', [verificarToken, verificarRol], (req, res) => {
    let id = req.params.id;
    let body = _.pick( req.body, 
        [ 'nombre' , 'email' , 'img' , 'role' , 'estado'] );


    Usuario.findByIdAndUpdate( id, 
        body,
        { new: true, runValidators: true },
        (err, usuarioDB) => {
            if ( err ) {
                return res.status(400).json({
                    ok: false,
                    err
                });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
    
});

app.delete('/usuario/:id', [verificarToken, verificarRol], (req, res) => {
    let id = req.params.id;

    Usuario.findByIdAndUpdate( id, 
        { estado: false },
        { new: true },
        ( err, usuarioBorrado ) => {
        if ( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if ( usuarioBorrado === null ) {
            return res.status( 400 ).json({
                ok: false,
                err: {
                    message: `Usuario no encontrado`
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    //     if ( err ) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     if ( !usuarioBorrado ) {
    //         return res.status( 400 ).json({
    //             ok: false,
    //             err: {
    //                 message: `Usuario no encontrado`
    //             }
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     });
    // });
});

module.exports = app;