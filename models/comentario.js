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
        foreignKey: "id",
        as: "usuario"
      })
    }
  }
  Comentario.init({
    texto: DataTypes.STRING,
    fecha: DataTypes.DATE,
    esVisible: DataTypes.BOOLEAN,
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    idPost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comentario',
  });
  return Comentario;
};