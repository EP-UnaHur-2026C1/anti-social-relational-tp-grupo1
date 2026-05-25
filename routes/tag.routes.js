/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del tag
 *         nombre:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Nombre único del tag
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *
 *     TagInput:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Nombre del tag
 *
 * tags:
 *   name: Tags
 *   description: Operaciones relacionadas con etiquetas
 */

const express = require("express");
const router = express.Router();

const {
  crearTag,
  obtenerTodosLosTags,
  obtenerTagPorId,
  actualizarTag,
  eliminarTag,
} = require("../controllers/tag.controller");

const { validarTagExiste } = require("../middlewares/validarTagExiste");
const { validarTag } = require("../middlewares/validarDatosTag");

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Crear un nuevo tag
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TagInput'
 *     responses:
 *       201:
 *         description: Tag creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       400:
 *         description: Error de validación - datos inválidos o tag duplicado
 *
 *   get:
 *     summary: Obtener todos los tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Lista de todos los tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", validarTag, crearTag);
router.get("/", obtenerTodosLosTags);

/**
 * @swagger
 * /tags/{id}:
 *   get:
 *     summary: Obtener un tag por su ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tag
 *     responses:
 *       200:
 *         description: Datos del tag solicitado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       404:
 *         description: Tag no encontrado
 *
 *   put:
 *     summary: Actualizar un tag existente
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tag a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 description: Nuevo nombre del tag
 *     responses:
 *       200:
 *         description: Tag actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Tag actualizado con éxito
 *                 tag:
 *                   $ref: '#/components/schemas/Tag'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Tag no encontrado
 *
 *   delete:
 *     summary: Eliminar un tag
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tag a eliminar
 *     responses:
 *       200:
 *         description: Tag eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Tag eliminado correctamente
 *       404:
 *         description: Tag no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", validarTagExiste, obtenerTagPorId);
router.put("/:id", validarTagExiste, validarTag, actualizarTag);
router.delete("/:id", validarTagExiste, eliminarTag);

module.exports = router;
