/**
 * @swagger
 * components:
 *   schemas:
 *     Comentario:
 *       type: object
 *       required:
 *         - texto
 *         - fecha
 *         - postId
 *         - usuarioId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del comentario
 *         texto:
 *           type: string
 *           minLength: 5
 *           maxLength: 500
 *           description: Contenido del comentario
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha del comentario
 *         esVisible:
 *           type: boolean
 *           default: true
 *           description: Indica si el comentario es visible
 *         postId:
 *           type: integer
 *           description: ID del post al que pertenece el comentario
 *         usuarioId:
 *           type: integer
 *           description: ID del usuario que creó el comentario
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *
 *     ComentarioInput:
 *       type: object
 *       required:
 *         - texto
 *         - fecha
 *         - postId
 *         - usuarioId
 *       properties:
 *         texto:
 *           type: string
 *           minLength: 5
 *           maxLength: 500
 *           description: Contenido del comentario
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha del comentario
 *         esVisible:
 *           type: boolean
 *           default: true
 *           description: Indica si el comentario es visible
 *         postId:
 *           type: integer
 *           description: ID del post al que pertenece
 *         usuarioId:
 *           type: integer
 *           description: ID del usuario que comenta
 *
 * tags:
 *   name: Comentarios
 *   description: Operaciones relacionadas con comentarios
 */

const { Router } = require('express');
const comentarioController = require('../controllers/comentario.controllers');
const validarComentario = require("../middlewares/validarComentario");
const validarAntiguedad = require("../middlewares/validarAntiguedad");
const {
  validarComentarioIdConPostYUsuario,
  validarComentarioId,
} = require("../middlewares/validarComentarioId")

const router = Router();

/**
 * @swagger
 * /comentarios:
 *   get:
 *     summary: Obtener todos los comentarios
 *     tags: [Comentarios]
 *     responses:
 *       200:
 *         description: Lista de todos los comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentario'
 *       500:
 *         description: Error interno del servidor
 *
 *   post:
 *     summary: Crear un nuevo comentario
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComentarioInput'
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', comentarioController.obtenerComentarios);
router.post('/', validarComentario, comentarioController.crearComentario);

/**
 * @swagger
 * /comentarios/{id}:
 *   get:
 *     summary: Obtener un comentario por su ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Datos del comentario solicitado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       404:
 *         description: Comentario no encontrado
 *
 *   put:
 *     summary: Actualizar un comentario existente
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comentario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 500
 *                 description: Nuevo texto del comentario
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Nueva fecha del comentario
 *               esVisible:
 *                 type: boolean
 *                 description: Estado de visibilidad del comentario
 *     responses:
 *       200:
 *         description: Comentario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 *   delete:
 *     summary: Eliminar un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comentario a eliminar
 *     responses:
 *       200:
 *         description: Comentario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comentario eliminado correctamente
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', validarComentarioIdConPostYUsuario, comentarioController.obtenerComentario);
router.put('/:id', validarComentario, validarComentarioId, comentarioController.actualizarComentario);
router.delete('/:id', validarComentarioId, comentarioController.eliminarComentario);

/**
 * @swagger
 * /comentarios/{id}/visibilidad:
 *   patch:
 *     summary: Ocultar un comentario (cambiar visibilidad a falso)
 *     description: Requiere que el comentario tenga al menos 6 meses de antigüedad (configurable mediante variable de entorno X_MESES)
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comentario a ocultar
 *     responses:
 *       200:
 *         description: Visibilidad del comentario cambiada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El comentario ya no es visible.
 *       400:
 *         description: El comentario no cumple con la antigüedad requerida o ya está oculto
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id/visibilidad', validarComentarioId, validarAntiguedad, comentarioController.cambiarVisibilidad);

module.exports = router;
