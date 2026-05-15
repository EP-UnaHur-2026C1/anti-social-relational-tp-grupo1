'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostImagen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PostImagen.init({
    nombre: DataTypes.STRING,
    URL: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'PostImagen',
  });
  return PostImagen;
};