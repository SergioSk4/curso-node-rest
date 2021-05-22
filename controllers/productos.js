const { response } = require('express');
const { Producto } = require('../models');

const crearProducto = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const precio = req.body.precio;
  const categoria = req.body.categoria;

  const productoDB = await Producto.findOne({ nombre });

  //Valida si ya existe
  if (productoDB) {
    return res.status(400).json({
      msg: 'El producto ya existe'
    });
  }

  //Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
    precio,
    categoria
  };

  const producto = new Producto(data);
  await producto.save();

  res.status(201).json(producto);
};

const productosGet = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { estado: true };

  const resp = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .limit(Number(limit))
      .skip(Number(from))
      .populate('usuario', ['name', 'email'])
      .populate('categoria', 'nombre')
  ]);

  res.json(resp);
};

const productoGetId = async (req, res = response) => {
  const id = req.params.id;
  const resp = await Producto.findById(id)
    .populate('usuario', ['name', 'email'])
    .populate('categoria', 'nombre');
  res.status(201).json(resp);
};

const actualizarProducto = async (req, res = response) => {
  const id = req.params.id;
  const { _id, estado, usuario, ...resto } = req.body;

  resto.nombre = resto.nombre.toUpperCase();
  resto.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, resto, { new: true });

  res.status(201).json(producto);
};

const productoDelete = async (req, res = response) => {
  const { id } = req.params;

  //Borrar físicamente
  //const usuario = await Usuario.findByIdAndDelete(id);

  //Borrar solo actualizando
  const data = {
    estado: false,
    usuario: req.usuario._id
  };
  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  return res.json({
    producto
  });
};

module.exports = {
  crearProducto,
  productosGet,
  productoGetId,
  actualizarProducto,
  productoDelete
};
