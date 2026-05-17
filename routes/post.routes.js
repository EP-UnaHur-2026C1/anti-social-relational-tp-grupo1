const express = require("express")
const router = express.Router()
const postController = require("../controllers/post.controllers")
const validarPostId = require("../middlewares/validarPostId")

router.get("/", postController.obtenerPosts)
router.get("/:id", validarPostId, postController.obtenerPost)
router.post("/", postController.crearPost)
router.put("/:id", validarPostId, postController.actualizarPost)
router.delete("/:id", validarPostId, postController.eliminarPost)

module.exports = router