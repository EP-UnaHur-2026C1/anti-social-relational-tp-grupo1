const Joi = require('joi');

const seguirSchema = Joi.object({
    usuarioId: Joi.number()
    .integer()
    .required()
    .messages({
            "string.base": "El id del usuario debe ser un número",
            "string.empty": "El id es obligatorio",
            "any.required": "El id es obligatorio"
    })
});

module.exports = seguirSchema;