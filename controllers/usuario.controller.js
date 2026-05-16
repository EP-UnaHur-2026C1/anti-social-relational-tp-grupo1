const { Usuario } = require('../models');

const usuarioController = {
    crearUsuario: async (req, res) => {
        try {
            const { nickName, email, password } = req.body

            const nuevoUsuario = await Usuario.create({
                nickName,
                email,
                password
            })

            res.status(201).json(nuevoUsuario)
        }
        catch (error) {
            res.status(400).json({ mensaje: "Error al crear el usuario", error: error.message })
        }
    },

    obtenerTodosLosUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll();
            res.status(200).json(usuarios);
        }
        catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });   
        }
    },
    obtenerUsuarioPorId: async (req, res) => {
        const usuario = req.usuario; 
        res.status(200).json(usuario);
    },
    actualizarUsuario: async (req, res) => {
        try {
            const { nickName, email, password } = req.body;

            const usuario = req.usuario;

            await usuario.update({
                nickName: nickName || usuario.nickName,
                email: email || usuario.email,
                password: password || usuario.password,
            });

            res.status(200).json({ mensaje: 'Usuario actualizado con éxito', usuario });
        } catch (error) {
            res.status(400).json({ mensaje: 'Error al actualizar usuario', error: error.message });
        }
    },
    eliminarUsuario: async (req, res) => {
        try {
            const usuario = req.usuario

            await usuario.destroy()

            res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al eliminar usuario', error: error.message });
        }
    }
};

module.exports = usuarioController;

