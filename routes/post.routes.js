/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - contenido
 *         - usuarioId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del post
 *         titulo:
 *           type: string
 *           maxLength: 100
 *           description: Título del post (opcional)
 *         contenido:
 *           type: string
 *           description: Contenido o descripción del post
 *         fecha:
 *           type: string
 *           description: Fecha del post
 *         usuarioId:
 *           type: integer
 *           description: ID del usuario que crea el post
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *
 *     PostInput:
 *       type: object
 *       required:
 *         - contenido
 *         - usuarioId
 *       properties:
 *         titulo:
 *           type: string
 *           maxLength: 100
 *           description: Título del post (opcional)
 *         contenido:
 *           type: string
 *           description: Contenido o descripción del post
 *         fecha:
 *           type: string
 *           description: Fecha del post
 *         usuarioId:
 *           type: integer
 *           description: ID del usuario que crea el post
 *
 * tags:
 *   name: Posts
 *   description: Operaciones relacionadas con publicaciones
 */

const express = require("express");
const router = express.Router();

const {
  crearPost,
  obtenerPosts,
  obtenerPost,
  actualizarPost,
  eliminarPost,
} = require("../controllers/post.controllers");

const validarPostId = require("../middlewares/validarPostId");
const { validarDatosPost } = require("../middlewares/validarDatosPost");

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crear una nueva publicación
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       201:
 *         description: Post creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 *
 *   get:
 *     summary: Obtener todas las publicaciones
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de todas las publicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", validarDatosPost, crearPost);
router.get("/", obtenerPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obtener una publicación por su ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post
 *     responses:
 *       200:
 *         description: Datos del post solicitado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post no encontrado
 *
 *   put:
 *     summary: Actualizar una publicación existente
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *                 description: Nuevo texto del post
 *               fecha:
 *                 type: string
 *                 description: Nueva fecha del post
 *     responses:
 *       200:
 *         description: Post actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 *   delete:
 *     summary: Eliminar una publicación
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post a eliminar
 *     responses:
 *       200:
 *         description: Post eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post eliminado
 *       404:
 *         description: Post no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", validarPostId, obtenerPost);
router.put("/:id", validarPostId, validarDatosPost, actualizarPost);
router.delete("/:id", validarPostId, eliminarPost);

module.exports = router;
