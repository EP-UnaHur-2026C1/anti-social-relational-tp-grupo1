const express = require("express");
const router = express.Router();

const {
  crearPostImagen,
  obtenerPostImagenes,
  obtenerPostImagen,
  eliminarPostImagen,
} = require("../controllers/postimagen.controllers");

const { validarPostImagenId } = require("../middlewares/validarPostImagenId");
const {
  validarDatosPostImagen,
} = require("../middlewares/validarDatosPostImagen");

router.post("/", validarDatosPostImagen, crearPostImagen);
router.get("/", obtenerPostImagenes);
router.get("/:id", validarPostImagenId, obtenerPostImagen);
router.delete("/:id", validarPostImagenId, eliminarPostImagen);

module.exports = router;
