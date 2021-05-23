const dbValidators = require('./db-validators');
const gentJwt = require('./gen-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');

module.exports = {
  ...dbValidators,
  ...gentJwt,
  ...googleVerify,
  ...subirArchivo
};
