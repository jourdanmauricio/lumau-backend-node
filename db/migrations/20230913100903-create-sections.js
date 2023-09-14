'use strict';

const { SectionSchema, SECTION_TABLE } = require('./../models/section.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(SECTION_TABLE, SectionSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(SECTION_TABLE);
  },
};
