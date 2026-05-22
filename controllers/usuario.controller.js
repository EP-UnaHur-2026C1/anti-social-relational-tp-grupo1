const { Usuario } = require("../models");

const crearUsuario = async (req, res) => {
  try {
    const { nickName, email, password } = req.body;
    const nuevoUsuario = await Usuario.create({ nickName, email, password });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al crear el usuario", error: error.message });
  }
};

const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener usuarios", error: error.message });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  const usuario = req.usuario;
  res.status(200).json(usuario);
};

const actualizarUsuario = async (req, res) => {
  try {
    const { nickName, email, password } = req.body;
    const usuario = req.usuario;

    await usuario.update({
      nickName: nickName || usuario.nickName,
      email: email || usuario.email,
      password: password || usuario.password,
    });

    res.status(200).json({ mensaje: "Usuario actualizado con éxito", usuario });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al actualizar usuario", error: error.message });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuario = req.usuario;
    await usuario.destroy();
    res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar usuario", error: error.message });
  }
};

const seguirUsuario = async (req, res) => {
  try {
    const usuario = req.usuario;
    const { usuarioId } = req.body;
    if (usuarioId === usuario.id) {
      res.status(400).json({ message: "No podes seguirte a vos mismo" })
    }
    const usuarioASeguir = await Usuario.findByPk(usuarioId);
    if (!usuarioASeguir) {
      res.status(404).json({ message: "Error: El usuario a seguir no existe" })
    }
    await usuario.addSeguido(usuarioASeguir)
    res.status(200).json({ message: "Usuario seguido correctamente" })
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al seguir usuario",
        error: error.message
      })
  }
}

module.exports = {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  seguirUsuario
};
