const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');

const collecionesPermitidas = ['usuarios', 'categorias', 'productos', 'roles'];

const buscarUsuarios = async (termino = '', res = response) => {
  const isMongoId = ObjectId.isValid(termino);

  if (isMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : []
    });
  }

  const regex = new RegExp(termino, 'i');
  const usuarios = await Usuario.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }]
  });
  res.json({
    results: usuarios
  });
};

const buscarCategoria = async (termino = '', res = response) => {
  const isMongoId = ObjectId.isValid(termino);

  if (isMongoId) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : []
    });
  }

  const regex = new RegExp(termino, 'i');
  const categoria = await Categoria.find({
    $or: [{ nombre: regex }],
    $and: [{ estado: true }]
  });
  return res.json({
    results: categoria
  });
};

const buscarProducto = async (termino = '', res = response) => {
  const isMongoId = ObjectId.isValid(termino);

  if (isMongoId) {
    const producto = await Producto.findById(termino);
    return res.json({
      results: producto ? [producto] : []
    });
  }

  const regex = new RegExp(termino, 'i');
  const producto = await Producto.find({
    $or: [{ nombre: regex }],
    $and: [{ estado: true }]
  });
  return res.json({
    results: producto
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!collecionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${collecionesPermitidas}`
    });
  }

  switch (coleccion) {
    case 'usuarios':
      buscarUsuarios(termino, res);
      break;
    case 'categoria':
      buscarCategoria(termino, res);
      break;
    case 'productos':
      buscarProducto(termino, res);
      break;

    default:
      return res.status(500).json({
        msg: 'Se olvido hacer la busqueda'
      });
      break;
  }
};

module.exports = {
  buscar
};
