//Verificacion del token
const jwt = require('jsonwebtoken');
let verificaToken = (req, res, next) => {

    let token = req.get('Authorization');
    jwt.verify(token, 'secret-demo', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();

    });


    /*res.json({
        token
    });
*/
};


//Verifica Admin rol

let verificaAdminROl = (req, res, next) => {
    let rol = req.role;

    if (rol ==='ADMIN_ROLE') {
        next();
    }else{
        return res.status(401).json({
            ok: false,
            err:{
                mensaje:'El usuario  NO es ADMINISTRADOR'
            }
        });
    }
};


module.exports = {
    verificaToken,
    verificaAdminROl
};