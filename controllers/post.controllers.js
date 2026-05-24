const { Post, PostImagen, Usuario, Tag} = require("../models")

const obtenerPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Usuario,
          as: "usuario",
        },
        {
          model: PostImagen,
          as: "imagenes",
        },
        {
          model: Tag,
          as: "tags",
        }
      ]
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerPost = async (req, res) => {
    res.status(200).json(req.post)
};

const crearPost = async (req, res) => {
  try {
    const { texto, fecha, idUsuario, tags, imagenes } = req.body;

    const post = await Post.create({
      texto,
      fecha,
      idUsuario,

    });

    if (imagenes && imagenes.length > 0) {
      for (const url of imagenes) {
        await PostImagen.create({
          url,
          idPost: post.idPost,
        });
      };
    };
    
    if (tags && tags.length > 0) {
      await post.addTags(tags);
    }

    res.status(201).json({
      mensaje: "Post creado correctamente",
      post,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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