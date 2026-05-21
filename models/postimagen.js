"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PostImagen extends Model {
    static associate(models) {
      PostImagen.belongsTo(models.Post, { foreignKey: "postId", as: "post" });
    }
  }
  PostImagen.init(
    {
      nombre: DataTypes.STRING,
      URL: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PostImagen",
      tableName: "post_imagens",
    },
  );
  return PostImagen;
};
