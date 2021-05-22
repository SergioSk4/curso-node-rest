const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { genJWT } = require("../helpers/gen-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario no es correcto -- Email"
      });
    }

    //Verificar si el usuario está activo
    if (!usuario.state) {
      return res.status(400).json({
        msg: "Usuario no es correcto -- State: False"
      });
    }

    //Validar contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario no es correcto -- Password"
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
      msg: "Hable con el administrador"
    });
  }
};

const googleSign = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, img, email } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      //Crear usuario
      const data = {
        name,
        email,
        img,
        google: true,
        password: ":P"
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    //Usuario en DB
    if (!usuario.state) {
      res.status(401).json({
        msg: "Hable con el Administrador -- Usuario bloqueado"
      });
    }

    // Generar JWT
    const token = await genJWT(usuario.id);

    res.json({
      msg: "Todo bien -  Google Sign in",
      usuario,
      token
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token no válido"
    });
  }
};

module.exports = {
  login,
  googleSign
};
