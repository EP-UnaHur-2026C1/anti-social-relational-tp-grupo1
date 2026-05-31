const { Post, PostImagen, Usuario, Tag, Comentario } = require("../models")

const obtenerPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: Usuario, as: "usuario" },
        { model: PostImagen, as: "imagenes"},
        { model: Tag, as: "tags", attributes: ["id", "nombre"], through: { attributes: [], } },
        { model: Comentario, as: "comentarios" },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id, {
      include: [
        { model: Usuario, as: "usuario" },
        { model: PostImagen, as: "imagenes"},
        { model: Tag, as: "tags", attributes: ["id", "nombre"], through: { attributes: [], } },
        { model: Comentario, as: "comentarios" },
      ],
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el post" })
  }
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
      }
    }

    if (tags && tags.length > 0) {
      await post.addTags(tags);
    }

    const postCreado = await Post.findByPk(post.idPost, {
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
        },
      ],
    });

    res.status(201).json({
      mensaje: "Post creado correctamente",
      post: postCreado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const actualizarPost = async (req, res) => {
  try {
    const { texto, tags } = req.body;
    const { id } = req.params;
    const post = await Post.findByPk(id);

    await post.update({
      texto,
      fecha: new Date(),
    });

    if (tags !== undefined) {
      await post.setTags(tags);
    }

    const postActualizado = await Post.findByPk(post.idPost, {
      include: [
        {
          model: Tag,
          as: "tags",
        },
      ],
    });

    res.status(200).json({
      mensaje: "Post actualizado correctamente",
      post: postActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al actualizar post",
      detalle: error.message,
    });
  }
};

const eliminarPost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findByPk(id)
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