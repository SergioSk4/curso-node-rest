const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario')

const usuariosGet = async(req, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const resp = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .limit(Number(limit))
        .skip(Number(from))
    ]);

    res.json(resp);
}

const usuariosPost = async(req, res = response) => {
    const { name, email, password, rol } = req.body;
    const usuario = new Usuario({ name, email, password, rol });

    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar en DB
    await usuario.save();

    //Return data saved in DB
    res.json({
        msg: 'Post API - Controlador',
        usuario
    });
}

const usuariosPut = async(req, res = response) => {
    const id = req.params.id;
    const { _id, password, google, email, ...resto } = req.body;

    //TODO validar contra DB
    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Push API - Controlador'
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    //Borrar físicamente
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Borrar solo actualizando
    const usuario = await Usuario.findByIdAndUpdate(id, { state: false });
    const usuarioAutenticado = req.usuario;
    return res.json({
        usuario
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}