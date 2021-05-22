const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');

const isValidRol = async (rol = '') => {
  const existRol = await Role.findOne({ rol });
  if (!existRol) {
    throw new Error(`The role is not vaild`);
  }
};

//Verificar si el correo existe
const emailExist = async (email = '') => {
  const exist = await Usuario.findOne({ email });
  if (exist) {
    throw new Error(`Email already exist`);
  }
};

const idExist = async (id) => {
  const exist = await Usuario.findById(id);
  if (!exist) {
    throw new Error(`The id does not exist`);
  }
};

const idCatExist = async (id) => {
  const exist = await Categoria.findById(id);
  if (!exist) {
    throw new Error(`The id does not exist`);
  }
};

const idProdExist = async (id) => {
  const exist = await Producto.findById(id);
  if (!exist) {
    throw new Error(`The id does not exist`);
  }
};

module.exports = {
  isValidRol,
  emailExist,
  idExist,
  idCatExist,
  idProdExist
};
