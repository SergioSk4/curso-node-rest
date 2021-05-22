const { response } = require('express');
const { Categoria } = require('../models');

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  //Valida si ya existe
  if (categoriaDB) {
    return res.status(400).json({
      msg: 'La categoría ya existe'
    });
  }

  //Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id
  };

  const categoria = new Categoria(data);
  await categoria.save();

  res.status(201).json(categoria);
};

const categoriasGet = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { estado: true };

  const resp = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .limit(Number(limit))
      .skip(Number(from))
      .populate('usuario')
  ]);

  res.json(resp);
};

const categoriasGetId = async (req, res = response) => {
  const id = req.params.id;
  const resp = await Categoria.findById(id).populate('usuario');
  res.status(201).json(resp);
};

const actualizarCategoria = async (req, res = response) => {
  const id = req.params.id;
  const { _id, estado, usuario, ...resto } = req.body;

  resto.nombre = resto.nombre.toUpperCase();
  resto.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, resto, { new: true });

  res.status(201).json(categoria);
};

const categoriaDelete = async (req, res = response) => {
  const { id } = req.params;

  //Borrar físicamente
  //const usuario = await Usuario.findByIdAndDelete(id);

  //Borrar solo actualizando
  const data = {
    estado: false,
    usuario: req.usuario._id
  };
  const categoria = await Categoria.findByIdAndUpdate(id, data);

  return res.json({
    categoria
  });
};

module.exports = {
  crearCategoria,
  categoriasGet,
  categoriasGetId,
  actualizarCategoria,
  categoriaDelete
};
