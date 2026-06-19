const { Comentario } = require('../models')

const validarComentarioIdConPostYUsuario = async (req, res, next) => {
    try {
        const { id } = req.params
        const comentario = await Comentario.findById(id)
            .select("texto fecha esVisible")
            .populate("post", "texto fecha")
            .populate("usuario", "nickName")
        if (!comentario) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        req.comentario = comentario
        next()
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el comentario"
        })
    }
}

const validarComentarioId = async (req, res, next) => {
    try {
        const { id } = req.params
        const comentario = await Comentario.findById(id)
        if (!comentario) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        req.comentario = comentario
        next()
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el comentario"
        })
    }
}

module.exports =
{
    validarComentarioIdConPostYUsuario,
    validarComentarioId
}