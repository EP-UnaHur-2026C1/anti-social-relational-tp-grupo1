"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.Usuario, {
        foreignKey: "idUsuario",
        as: "usuario",
      });

      Post.hasMany(models.Comentario, {
        foreignKey: "idPost",
        as: "comentarios",
      });

      Post.hasMany(models.PostImagen, {
        foreignKey: "idPost",
        as: "imagenes",
      });

      Post.belongsToMany(models.Tag, {
        through: "PostTags",
        foreignKey: "idPost",
        otherKey: "idTag",
        as: "tags",
      });
    }
  }

  Post.init(
    {
      idPost: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fecha: {
        type: DataTypes.DATE,
      },
      texto: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "Posts",
      timestamps: false,
    }
  );

  return Post;
};