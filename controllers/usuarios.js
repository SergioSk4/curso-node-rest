const { response } = require('express');

const usuariosGet = (req, res = response) => {

    const params = req.query;
    res.json({
        msg: 'get API -controllador',
        params
    });
}

const usuariosPost = (req, res = response) => {
    const body = req.body;
    res.json({
        msg: 'Post API - Controlador',
        body
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'Put API - Controlador',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Push API - Controlador'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API - Controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}