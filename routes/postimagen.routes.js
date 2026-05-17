const express = require("express")
const router = express.Router()
const postImagenController = require("../controllers/postimagen.controllers")
const validarPostImagenId = require("../middlewares/validarPostImagenId")

router.get("/", postImagenController.obtenerPostImagenes)
router.get("/:id", validarPostImagenId, postImagenController.obtenerPostImagen)
router.post("/", postImagenController.crearPostImagen)
router.delete("/:id", validarPostImagenId, postImagenController.eliminarPostImagen)

module.exports = router