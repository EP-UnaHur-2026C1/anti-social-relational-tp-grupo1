'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.Post, {foreignKey: 'idUsuario', as: 'posts'});

      Usuario.hasMany(models.Comentario, {foreignKey: 'idUsuario', as: 'comentarios'});

      Usuario.belongsToMany(models.Usuario, {
        through: "UsuarioAUsuario",
        foreignKey: "seguidoId",
        otherKey: "seguidorId",
        as: "seguidores"
      });

      Usuario.belongsToMany(models.Usuario, {
        through: "UsuarioAUsuario",
        foreignKey: "seguidorId",
        otherKey: "seguidoId",
        as: "seguidos"
      })
    }
  }
  Usuario.init({
    nickName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: true,
    paranoid: true
  });
  return Usuario;
};