const express = require('express');
const app = express();
const Usuario = require('../models/usuarios');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const { verificarToken } = require('../middlewares/autenticacion');

app.post('/login', (req, res) => {

    let body = req.body;
    
    Usuario.findOne(
        { email: body.email },
        (err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            if ( !usuarioDB ) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "(Usuario) o contraseña incorrectos"
                    }
                })
            }
            if ( !bcrypt.compareSync( body.password, usuarioDB.password) ){
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Usuario o (contraseña) incorrectos"
                    }
                })
            }

            let token = jwt.sign({
                usuario : usuarioDB
            }, process.env.TOKENSEED
            ,{
                expiresIn: process.env.CADUCIDAD_TOKEN
            })

            res.json({
                ok: true,
                usuarioDB,
                token
            })
    })
})

module.exports = app;