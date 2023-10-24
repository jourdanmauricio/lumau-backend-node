'use strict';

const { SlideSchema, SLIDE_TABLE } = require('../models/slide.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(SLIDE_TABLE, SlideSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(SLIDE_TABLE);
  },
};
