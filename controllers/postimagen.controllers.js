const { PostImagen } = require("../models")

const obtenerPostImagenes = async (req, res) => {
  try {
    const imagenes = await PostImagen.findAll({
      include: [
        {
          model: Post,
          as: "post",
          attributes: ["id", "titulo", "contenido"],
        },
      ],
    });

    res.status(200).json(imagenes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerPostImagen = async (req, res) => {
    res.status(200).json(req.PostImagen)
}

const crearPostImagen = async (req, res) => { 
  try {
    const { url, idPost } = req.body;

    const imagen = await PostImagen.create({
      url,
      idPost,
    });

    res.status(201).json(imagen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarPostImagen = async (req, res) => {
    try {
        const imagen = req.PostImagen
        await imagen.destroy()
        res.status(200).json({ message: "Imagen eliminada" })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar imagen" })
    }
}

module.exports = {
    obtenerPostImagenes,
    obtenerPostImagen,
    crearPostImagen,
    eliminarPostImagen
}