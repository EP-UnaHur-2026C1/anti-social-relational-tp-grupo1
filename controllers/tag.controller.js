const { Tag } = require("../models");

const crearTag = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevoTag = await Tag.create({ nombre });
    res.status(201).json(nuevoTag);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al crear el tag", error: error.message });
  }
};

const obtenerTodosLosTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener los tags", error: error.message });
  }
};

const obtenerTagPorId = async (req, res) => {
  const { id } = req.params;
  const tag = await Tag.findByPk(id);
  res.status(200).json(tag.nombre);
};

const actualizarTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const tag = await Tag.findByPk(id);
    await tag.update({ nombre: nombre || tag.nombre });
    res.status(200).json({ mensaje: "Tag actualizado con éxito", tag });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al actualizar el tag", error: error.message });
  }
};

const eliminarTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);
    await tag.destroy();
    res.status(200).json({ mensaje: "Tag eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar el tag", error: error.message });
  }
};

module.exports = {
  crearTag,
  obtenerTodosLosTags,
  obtenerTagPorId,
  actualizarTag,
  eliminarTag,
};
