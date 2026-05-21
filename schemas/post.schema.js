const Joi = require("joi");

const postSchema = Joi.object({
  titulo: Joi.string().max(100).optional(),
  contenido: Joi.string().min(1).required().messages({
    "string.empty": "La descripción del post no puede estar vacía",
    "any.required": "La descripción del post es obligatoria",
  }),
  fecha: Joi.string().optional(),
  usuarioId: Joi.number().integer().required().messages({
    "any.required":
      "El ID del usuario es obligatorio para crear una publicación",
  }),
});

module.exports = postSchema;