const Role = require('../models/role');
const Usuario = require('../models/usuario');

const isValidRol = async(rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`The role is not vaild`);
    }
}

//Verificar si el correo existe
const emailExist = async(email = '') => {
    const exist = await Usuario.findOne({ email })
    if (exist) {
        throw new Error(`Email already exist`);
    }
}

const idExist = async(id) => {
    const exist = await Usuario.findById(id);
    if (!exist) {
        throw new Error(`The id does nott exist`);
    }
}

module.exports = {
    isValidRol,
    emailExist,
    idExist
}