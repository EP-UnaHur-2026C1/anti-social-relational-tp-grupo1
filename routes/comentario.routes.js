const { Router } = require('express');
const comentarioController = require('../controllers/comentario.controllers');
const validarComentario = require("../middlewares/validarComentario");
const validarAntiguedad = require("../middlewares/validarAntiguedad");
const {
  validarComentarioIdConPostYUsuario,
  validarComentarioId,
} = require("../middlewares/validarComentarioId")


const router = Router();

router.get('/', comentarioController.obtenerComentarios);
router.get('/:id', validarComentarioIdConPostYUsuario, comentarioController.obtenerComentario); 
router.post('/', validarComentario, comentarioController.crearComentario); 
router.put('/:id', validarComentario, validarComentarioId, comentarioController.actualizarComentario); 
router.patch('/:id/visibilidad', validarComentarioId, validarAntiguedad, comentarioController.cambiarVisibilidad);
router.delete('/:id', validarComentarioId, comentarioController.eliminarComentario); 

module.exports = router;