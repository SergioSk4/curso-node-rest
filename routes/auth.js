const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSign } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.post('/login', [
    check('email', 'You must add an email').isEmail(),
    check('password', 'You must add a password').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'Id token is necessary').not().isEmpty(),
    validarCampos
], googleSign);


module.exports = router;