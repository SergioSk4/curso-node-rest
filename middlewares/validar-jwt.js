const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req, res = response, next) => {

    const token = req.header('x-token');

    // console.log(token);

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETTOPRIVATEKEY);

        //Leer usuario que corresponde al Uid
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: "Token no válido -- El usuario no existe en DB"
            });
        }

        //Verificar si el uid esta activo
        if (!usuario.state) {
            return res.status(401).json({
                msg: "Token no válido -- Usuario no activo"
            });
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        });
    }

}

module.exports = {
    validarJWT
}