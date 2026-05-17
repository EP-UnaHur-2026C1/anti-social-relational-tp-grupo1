const { Post, PostImagen, Usuario } = require("../models")

const obtenerPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                { model: PostImagen, as: 'imagenes', attributes: ['url'] },
                { model: Usuario, attributes: ['nombre'] }
            ]
        })
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const obtenerPost = async (req, res) => {
    res.status(200).json(req.post)
}

const crearPost = async (req, res) => {
    try {
        const { texto, fecha, idUsuario } = req.body
        const post = await Post.create({ texto, fecha, idUsuario })
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({ error: "Error al crear post" })
    }
}

const actualizarPost = async (req, res) => {
    try {
        const { texto, fecha } = req.body
        const post = req.post
        await post.update({ texto, fecha })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar post" })
    }
}

const eliminarPost = async (req, res) => {
    try {
        const post = req.post
        await post.destroy()
        res.status(200).json({ message: "Post eliminado" })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar post" })
    }
}

module.exports = {
    obtenerPosts,
    obtenerPost,
    crearPost,
    actualizarPost,
    eliminarPost
}