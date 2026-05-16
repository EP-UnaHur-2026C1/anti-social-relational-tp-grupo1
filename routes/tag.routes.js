const express = require('express');
const router = express.Router();

const tagController = require('../controllers/tag.controller');
const { validarTagExiste } = require('../middlewares/validarTagExiste');
const { validarTag } = require('../middlewares/validarDatosTag');

router.post('/', validarTag, tagController.crearTag);
router.get('/', tagController.obtenerTodosLosTags);

router.get('/:id', validarTagExiste, tagController.obtenerTagPorId);
router.put('/:id', validarTagExiste, validarTag, tagController.actualizarTag);
router.delete('/:id', validarTagExiste, tagController.eliminarTag);

module.exports = router;