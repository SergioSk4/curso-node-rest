const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPatch, usuariosPut, usuariosDelete } = require('../controllers/usuarios');
const { isValidRol, emailExist, idExist } = require('../helpers/db-validators');


// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { isAdmin, hasRole } = require('../middlewares/validar-roles');
const { validarCampos, validarJWT, isAdmin, hasRole } = require('../middlewares');

const router = Router();


router.get('/', usuariosGet);
router.post('/', [
    check('name', 'El nombre ingresado no es valido').not().isEmpty(),
    check('password', 'El password ingresado no es valido').isLength({ min: 6 }),
    check('email', 'El correo ingresado no es valido').isEmail(),
    // check('rol', 'No es un rol válid').isIn(['ADMIN_ROL', 'USER_ROL']), Validacion se realiza en base de datos
    check('rol').custom(isValidRol),
    check('email').custom(emailExist),
    validarCampos
], usuariosPost);
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idExist),
    check('rol').custom(isValidRol),
    validarCampos
], usuariosPut);
router.patch('/', usuariosPatch);
router.delete('/:id', [
    validarJWT,
    //isAdmin,
    hasRole('ADMIN_ROL', 'SELLS_ROL'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idExist),
    validarCampos
], usuariosDelete);


module.exports = router;