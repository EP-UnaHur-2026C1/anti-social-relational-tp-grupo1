'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Post, {
        through: 'PostTags',
        foreignKey: 'tagId',
        as: 'posts'
      })
    }
  }
  Tag.init({
    nombre: DataTypes.STRING,
    allowNull: false,
    unique: true
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags',
    timestamps: true
  });
  return Tag;
};