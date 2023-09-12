'use strict';

const { ImageSchema, IMAGE_TABLE } = require('./../models/image.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(IMAGE_TABLE, ImageSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(IMAGE_TABLE);
  },
};
