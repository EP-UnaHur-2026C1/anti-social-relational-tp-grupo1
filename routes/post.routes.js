const express = require("express");
const router = express.Router();

const {
  crearPost,
  obtenerPosts,
  obtenerPost,
  actualizarPost,
  eliminarPost,
} = require("../controllers/post.controllers");

const { validarPostId } = require("../middlewares/validarPostId");
const { validarDatosPost } = require("../middlewares/validarDatosPost");


router.post("/", validarDatosPost, crearPost);
router.get("/", obtenerPosts);
router.get("/:id", validarPostId, obtenerPost);
router.put("/:id", validarPostId, validarDatosPost, actualizarPost);
router.delete("/:id", validarPostId, eliminarPost);

module.exports = router;
