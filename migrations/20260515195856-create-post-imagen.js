"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PostImagenes", {
      idImagen: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      idPost: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Posts",
          key: "idPost",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PostImagenes");
  },
};