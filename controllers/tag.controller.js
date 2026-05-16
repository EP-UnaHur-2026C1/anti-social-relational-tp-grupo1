const { Tag } = require('../models');

const tagController = {

  crearTag: async (req, res) => {
    try {
      const { nombre } = req.body;

      const nuevoTag = await Tag.create({ nombre });

      res.status(201).json(nuevoTag);
    } catch (error) {
      res.status(400).json({ mensaje: 'Error al crear el tag', error: error.message });
    }
  },

  obtenerTodosLosTags: async (req, res) => {
    try {
      const tags = await Tag.findAll();
      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener los tags', error: error.message });
    }
  },

  obtenerTagPorId: async (req, res) => {
    const tag = req.tag;
    res.status(200).json(tag);
  },

  actualizarTag: async (req, res) => {
    try {
      const { nombre } = req.body;

      const tag = req.tag
      
      await tag.update({
        nombre: nombre || tag.nombre
      });

      res.status(200).json({ mensaje: 'Tag actualizado con éxito', tag });
    } catch (error) {
      res.status(400).json({ mensaje: 'Error al actualizar el tag', error: error.message });
    }
  },

  eliminarTag: async (req, res) => {
    try {
      const tag = req.tag

      await tag.destroy()

      res.status(200).json({ mensaje: 'Tag eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar el tag', error: error.message });
    }
  }
};

module.exports = tagController;