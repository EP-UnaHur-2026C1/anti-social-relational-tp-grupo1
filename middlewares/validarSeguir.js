const seguirUsuarioSchema = require("../schemas/seguir.schema")

const validarSeguir = (req, res, next) => {
    const { error } = seguirUsuarioSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

module.exports = { validarSeguir };