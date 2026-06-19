const Joi = require("joi");

const postSchema = Joi.object({
  texto: Joi.string().min(1).required().messages({
    "string.empty": "La descripción del post no puede estar vacía",
    "any.required": "La descripción del post es obligatoria",
  }),
  tags: Joi.array()
    .items(Joi.string().messages({
      "string.empty": "Los tags no pueden estar vacíos",
    }))
    .optional(),

  fecha: Joi.string().optional(),
  usuario: Joi.string().required().messages({
    "any.required":
      "El ID del usuario es obligatorio para crear una publicación",
  }),
  imagenes: Joi.array()
    .items(Joi.string().uri().messages({
      "string.uri": "Cada imagen debe ser una URL válida",
    }))
    .optional(),
});

module.exports = postSchema;