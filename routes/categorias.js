const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, isAdmin } = require('../middlewares');
const {
  crearCategoria,
  categoriasGet,
  categoriasGetId,
  actualizarCategoria,
  categoriaDelete
} = require('../controllers/categorias');
const { idCatExist } = require('../helpers/db-validators');

const router = Router();

//Obtener todas las categoreias - Publico
router.get('/', categoriasGet);

//Obtener una categoreia por id - Publico
router.get(
  '/:id',
  [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(idCatExist),
    validarCampos
  ],
  categoriasGetId
);

//Crear una categoreia - Privado(Cualquier usuario con token)
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
  ],
  crearCategoria
);

//Acualizar una categoreia por Id - Privado(Cualquier usuario con token)
router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(idCatExist),
    validarCampos
  ],
  actualizarCategoria
);

//Borrar una categoreia - Privado(Solo admin)
router.delete(
  '/:id',
  [
    validarJWT,
    isAdmin,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idCatExist),
    validarCampos
  ],
  categoriaDelete
);
module.exports = router;
