const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { genJWT } = require('../helpers/gen-jwt');


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario no es correcto -- Email'
            });
        }

        //Verificar si el usuario está activo
        if (!usuario.state) {
            return res.status(400).json({
                msg: 'Usuario no es correcto -- State: False'
            });
        }

        //Validar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario no es correcto -- Password'
            });
        }


        // Generar JWT
        const token = await genJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }


}

module.exports = {
    login
}