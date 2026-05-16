const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller');
const { validarUsuarioExiste } = require('../middlewares/validarUsuarioExiste');
const { validarUsuario } = require('../middlewares/validarDatosUsuario');

router.post('/', validarUsuario, usuarioController.crearUsuario);
router.get('/', usuarioController.obtenerTodosLosUsuarios);

router.get('/:id', validarUsuarioExiste, usuarioController.obtenerUsuarioPorId);
router.put('/:id', validarUsuarioExiste, validarUsuario, usuarioController.actualizarUsuario);
router.delete('/:id', validarUsuarioExiste, usuarioController.eliminarUsuario);

module.exports = router;