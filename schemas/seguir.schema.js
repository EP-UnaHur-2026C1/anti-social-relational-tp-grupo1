const Joi = require('joi');

const seguirSchema = Joi.object({
    usuarioId: Joi.string()
    .required()
    .messages({
            "string.base": "El id del usuario debe ser un texto",
            "string.empty": "El id es obligatorio",
            "any.required": "El id es obligatorio"
    })
});

module.exports = seguirSchema;