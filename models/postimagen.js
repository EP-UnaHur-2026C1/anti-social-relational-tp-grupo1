"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PostImagen extends Model {
    static associate(models) {
      PostImagen.belongsTo(models.Post, { foreignKey: "idPost", as: "post" });
    }
  }
  PostImagen.init(
    {
      idImagen: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      idPost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PostImagen",
      tableName: "PostImagenes",
      timestamps: false,
    }
  );

  return PostImagen;
};