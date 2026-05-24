'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comentario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comentario.belongsTo(models.Post, {
        foreignKey: "idPost",
        as: "post",
      });
      Comentario.belongsTo(models.Usuario, {
        foreignKey: "idUsuario",
        as: "usuario"
      })
    }
  }
  Comentario.init({
    texto: DataTypes.STRING,
    fecha: DataTypes.DATE,
    esVisible: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Comentario',
  });
  return Comentario;
};