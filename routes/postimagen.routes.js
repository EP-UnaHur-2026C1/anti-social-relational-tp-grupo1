const express = require("express");
const router = express.Router();

const {
  crearPostImagen,
  obtenerPostImagens,
  obtenerPostImagen,
  actualizarPostImagen,
  eliminarPostImagen,
} = require("../controllers/postimagen.controllers");

const { validarPostImagenId } = require("../middlewares/validarPostImagenId");
const {
  validarDatosPostImagen,
} = require("../middlewares/validarDatosPostImagen");

router.post("/", validarDatosPostImagen, crearPostImagen);
router.get("/", obtenerPostImagens);
router.get("/:id", validarPostImagenId, obtenerPostImagen);
router.put(
  "/:id",
  validarPostImagenId,
  validarDatosPostImagen,
  actualizarPostImagen,
);
router.delete("/:id", validarPostImagenId, eliminarPostImagen);

module.exports = router;
