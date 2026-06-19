const { Comentario, Usuario, Post } = require("../models");

const obtenerComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.find()
      .select("texto fecha esVisible")
      .populate("usuario", "nickName")
      .populate("post", "texto");
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const obtenerComentario = async (req, res) => {
  const comentario = req.comentario;
  res.status(200).json(comentario);
};

const crearComentario = async (req, res) => {
  try {
    const { texto, post, usuario } = req.body;
    const comentario = await Comentario.create({
      texto,
      esVisible: true,
      post,
      usuario,
    });
    res.status(201).json(comentario);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const actualizarComentario = async (req, res) => {
  try {
    const { texto, fecha, esVisible } = req.body;
    const comentario = req.comentario;

    if (texto !== undefined) comentario.texto = texto;
    if (fecha !== undefined) comentario.fecha = fecha;
    if (esVisible !== undefined) comentario.esVisible = esVisible;
    await comentario.save();

    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el comentario",
    });
  }
};

const eliminarComentario = async (req, res) => {
  try {
    const comentario = req.comentario;
    await comentario.deleteOne();
    res.status(200).json({
      message: "Comentario eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar el comentario",
    });
  }
};

const cambiarVisibilidad = async (req, res) => {
  try {
    const comentario = req.comentario;

    comentario.esVisible = false;
    await comentario.save();

    res.status(200).json({
      message: "El comentario ya no es visible.",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al cambiar la visibilidad del comentario.",
    });
  }
};

module.exports = {
  obtenerComentarios,
  obtenerComentario,
  crearComentario,
  actualizarComentario,
  eliminarComentario,
  cambiarVisibilidad,
};
