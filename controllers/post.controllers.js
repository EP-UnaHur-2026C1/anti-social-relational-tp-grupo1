const { Post, PostImagen, Usuario, Tag, Comentario, PostTag } = require("../models");

const obtenerPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("usuario").lean();
    const ids = posts.map((p) => p._id);

    const [imagenes, comentarios, postTags] = await Promise.all([
      PostImagen.find({ post: { $in: ids } }).lean(),
      Comentario.find({ post: { $in: ids } }).populate("usuario").lean(),
      PostTag.find({ post: { $in: ids } }).populate("tag").lean(),
    ]);

    const postsConTodo = posts.map((post) => ({
      ...post,
      imagenes: imagenes.filter((i) => i.post.toString() === post._id.toString()),
      tags: postTags
        .filter((pt) => pt.post.toString() === post._id.toString())
        .map((pt) => pt.tag),
      comentarios: comentarios.filter(
        (c) => c.post.toString() === post._id.toString()
      ),
    }));

    res.status(200).json(postsConTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("usuario").lean();
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    const [imagenes, comentarios, postTags] = await Promise.all([
      PostImagen.find({ post: post._id }).lean(),
      Comentario.find({ post: post._id }).populate("usuario").lean(),
      PostTag.find({ post: post._id }).populate("tag").lean(),
    ]);

    post.imagenes = imagenes;
    post.tags = postTags.map((pt) => pt.tag);
    post.comentarios = comentarios;

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el post" });
  }
};

const crearPost = async (req, res) => {
  try {
    const { texto, fecha, usuario, tags, imagenes } = req.body;

    const post = await Post.create({
      texto,
      fecha,
      usuario,
    });

    if (imagenes && imagenes.length > 0) {
      const imagenesDoc = imagenes.map((url) => ({ url, post: post._id }));
      await PostImagen.insertMany(imagenesDoc);
    }

    if (tags && tags.length > 0) {
      const tagsDoc = tags.map((tagId) => ({ post: post._id, tag: tagId }));
      await PostTag.insertMany(tagsDoc);
    }

    const postCreado = await Post.findById(post._id)
      .populate("usuario")
      .lean();

    const [imagenesPost, postTags] = await Promise.all([
      PostImagen.find({ post: post._id }).lean(),
      PostTag.find({ post: post._id }).populate("tag").lean(),
    ]);

    postCreado.imagenes = imagenesPost;
    postCreado.tags = postTags.map((pt) => pt.tag);

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
    const post = await Post.findById(id);

    if (texto !== undefined) post.texto = texto;
    post.fecha = new Date();
    await post.save();

    if (tags !== undefined) {
      await PostTag.deleteMany({ post: post._id });
      if (tags.length > 0) {
        const tagsDoc = tags.map((tagId) => ({ post: post._id, tag: tagId }));
        await PostTag.insertMany(tagsDoc);
      }
    }

    const postActualizado = await Post.findById(post._id).lean();
    const postTags = await PostTag.find({ post: post._id })
      .populate("tag")
      .lean();
    postActualizado.tags = postTags.map((pt) => pt.tag);

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
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    await Promise.all([
      PostImagen.deleteMany({ post: post._id }),
      Comentario.deleteMany({ post: post._id }),
      PostTag.deleteMany({ post: post._id }),
      post.deleteOne(),
    ]);
    res.status(200).json({ message: "Post eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar post" });
  }
};

module.exports = {
  obtenerPosts,
  obtenerPost,
  crearPost,
  actualizarPost,
  eliminarPost,
};
