const { Comentario, Usuario, Post } = require("../models")

const obtenerComentarios = async (req, res) => {
    try {
        const comentarios = await Comentario.findAll({
            attributes: ["texto", "fecha", "esVisible"],
            include: [{
                model: Usuario,
                as: 'usuario',
                attributes: ["nombre"]
            },
            {
                model: Post,
                as: 'post',
                attributes: ["titulo", "contenido", "fecha"]
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
    try {

    } catch (error) {

    }
}

const crearComentario = async (req, res) => {
    try {

    } catch (error) {

    }
}

const actualizarComentario = async (req, res) => {
    try {

    } catch (error) {

    }
}

const eliminarComentario = async (req, res) => {
    try {

    } catch (error) {

    }
}

const cambiarVisibilidad = async (req, res) => {
    try {

    } catch (error) {

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