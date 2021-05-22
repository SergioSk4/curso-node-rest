const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, isAdmin } = require('../middlewares');
const { idCatExist, idProdExist } = require('../helpers/db-validators');
const {
  crearProducto,
  productosGet,
  productoGetId,
  actualizarProducto,
  productoDelete
} = require('../controllers/productos');

const router = Router();

//Obtener todas las categoreias - Publico
router.get('/', productosGet);

//Obtener una categoreia por id - Publico
router.get(
  '/:id',
  [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(idProdExist),
    validarCampos
  ],
  productoGetId
);

//Crear una categoreia - Privado(Cualquier usuario con token)
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'El id no es valido').isMongoId(),
    check('categoria').custom(idCatExist),
    validarCampos
  ],
  crearProducto
);

//Acualizar una categoreia por Id - Privado(Cualquier usuario con token)
router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(idProdExist),
    check('categoria', 'El id no es valido').isMongoId(),
    check('categoria').custom(idCatExist),
    validarCampos
  ],
  actualizarProducto
);

//Borrar una categoreia - Privado(Solo admin)
router.delete(
  '/:id',
  [
    validarJWT,
    isAdmin,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idProdExist),
    validarCampos
  ],
  productoDelete
);
module.exports = router;
