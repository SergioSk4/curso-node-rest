const { response } = require("express");
const { models } = require("mongoose");


const isAdmin = (req, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token.'
        });
    }

    const { rol, name } = req.usuario;

    if (rol !== 'ADMIN_ROL') {
        return res.status(401).json({
            msg: 'El usuario no es un administrador'
        });
    }
    next();
}

const hasRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token.'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(501).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    isAdmin,
    hasRole
}