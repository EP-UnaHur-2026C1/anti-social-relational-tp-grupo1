const express = require("express");
const router = express.Router();

const {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  seguirUsuario
} = require("../controllers/usuario.controller");

const { validarUsuarioExiste } = require("../middlewares/validarUsuarioExiste");
const { validarUsuario } = require("../middlewares/validarDatosUsuario");
const { validarSeguir } = require("../middlewares/validarSeguir")

router.post("/", validarUsuario, crearUsuario);
router.get("/", obtenerTodosLosUsuarios);
router.get("/:id", validarUsuarioExiste, obtenerUsuarioPorId);
router.put("/:id", validarUsuarioExiste, validarUsuario, actualizarUsuario);
router.delete("/:id", validarUsuarioExiste, eliminarUsuario);
router.post(":id/seguir", validarUsuarioExiste, validarSeguir, seguirUsuario)

module.exports = router;
