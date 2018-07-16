const jwt = require('jsonwebtoken');

// ================
// Verificar token
let verificarToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify( token, process.env.TOKENSEED, (err, decoded) => {
        if ( err ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        } else {
            req.usuario = decoded.usuario;
            next();
        }

    })
}

let verificarRol = ( req, res, next) => {
    let usuario = req.usuario;
    if ( usuario.role !== 'ADMIN_ROLE' ) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    } else {
        next ();
    }
}

module.exports = {
    verificarToken,
    verificarRol
};
