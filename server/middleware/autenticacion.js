const jwt = require('jsonwebtoken')


/// ================
/// Verificar token
/// ================
let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }

        // res.json({
        //     ok: true,
        //     token
        // })

        req.usuario = decoded.usuario;
        next();

    });
};

/// ================
/// Verificar Admin Role
/// ================
let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario

    if (usuario.role != 'ADMIN_ROLE') {

        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es admin'
            }
        })
    }

    next();

};










module.exports = {
    verificaToken,
    verificaAdminRole
}