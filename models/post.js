'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.hasMany(models.PostImagen, { 
        foreignKey: 'idPost',
        as: 'imagenes' 
      });
    }
  }
  Post.init({
    fecha: DataTypes.DATETIME,
    texto: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};