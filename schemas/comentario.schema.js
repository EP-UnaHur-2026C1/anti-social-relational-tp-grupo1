const Joi = require('joi').extend(require('@joi/date'));

const comentarioSchema = Joi.object({
    texto: Joi.string()
        .min(5)
        .max(500)
        .required()
        .messages({
            "string.base": "El comentario debe ser texto",
            "string.empty": "El texto es obligatorio",
            "string.min": "El texto debe tener al menos 5 caractéres",
            "string.max": "El texto debe tener máximo 500 caractéres",
            "any.required": "El texto es obligatorio"
        }),
    fecha: Joi.date().format('DD-MM-YYYY').required(),
    esVisible: Joi.boolean().default(true),
})

module.exports = comentarioSchema