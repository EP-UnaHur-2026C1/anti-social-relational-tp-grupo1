const { Router } = require('express');
const comentarioController = require('../controllers/comentario.controllers');


const router = Router();

router.get('/', comentarioController.obtenerComentarios);
router.get('/:id', comentarioController.obtenerComentario); 
router.post('/', comentarioController.crearComentario); 
router.put('/:id', comentarioController.actualizarComentario); 
// router.put('/visibilidad/actualizar', comentarioController.cambiarVisibilidad);
router.delete('/:id', comentarioController.eliminarComentario); 

module.exports = router;