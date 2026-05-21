"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.Usuario, {
        foreignKey: "usuarioId",
        as: "usuario",
      });

      Post.hasMany(models.Comentario, {
        foreignKey: "postId",
        as: "comentarios",
      });

      Post.hasMany(models.PostImagen, { foreignKey: "postId", as: "imagenes" });

      Post.belongsToMany(models.Tag, {
        through: "PostTags",
        foreignKey: "postId",
        as: "tags",
      });
    }
  }
  Post.init(
    {
      titulo: DataTypes.STRING,
      contenido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
    },
  );
  return Post;
};
