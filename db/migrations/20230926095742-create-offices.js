'use strict';

const { OfficeSchema, OFFICE_TABLE } = require('./../models/office.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(OFFICE_TABLE, OfficeSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(OFFICE_TABLE);
  },
};
