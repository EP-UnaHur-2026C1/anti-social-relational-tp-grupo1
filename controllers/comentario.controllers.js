const { Comentario, Usuario, Post } = require("../models")

const obtenerComentarios = async (req, res) => {
    try {
        const comentarios = await Comentario.findAll({
            attributes: ["texto", "fecha", "esVisible"],
            include: [{
                model: Usuario,
                as: 'usuario',
                attributes: ["nickName"]
            },
            {
                model: Post,
                as: 'post',
                attributes: ["idPost", "texto"]
            }
            ]
        })
        res.status(200).json(comentarios)
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

const obtenerComentario = async (req, res) => {
    const comentario = req.comentario;
    res.status(200).json(comentario);
}

const crearComentario = async (req, res) => {
    try {
        const { texto, fecha, esVisible, postId, usuarioId } = req.body;
        const comentario = await Comentario.create({
            texto,
            fecha,
            esVisible,
            postId,
            usuarioId
        });
        res.status(201).json(comentario);
    } catch (error) {
        res.status(500).json({
            error: "Error al crear comentario",
        });
    }
}

const actualizarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const { texto, fecha, esVisible } = req.body;
        const comentario = req.comentario;
        await comentario.update({
            texto,
            fecha,
            esVisible
        });
        res.status(200).json(comentario);
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar el comentario",
        })
    }
}

const eliminarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const comentario = req.comentario;
        await comentario.destroy();
        res.status(200).json({
            message: "Comentario eliminado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar el comentario",
        })
    }
}

const cambiarVisibilidad = async (req, res) => {
    try {
        const { id } = req.params;
        const comentario = req.comentario;

        await comentario.update({
            esVisible: false
        });
        res.status(200).json({
            message: "El comentario ya no es visible.",
        })
    } catch (error) {
        res.status(500).json({
            error: "Error al cambiar la visibilidad del comentario.",
        })
    }
}

module.exports = {
    obtenerComentarios,
    obtenerComentario,
    crearComentario,
    actualizarComentario,
    eliminarComentario,
    cambiarVisibilidad
}