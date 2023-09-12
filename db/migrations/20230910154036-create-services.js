'use strict';

const { ServiceSchema, SERVICE_TABLE } = require('./../models/service.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(SERVICE_TABLE, ServiceSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(SERVICE_TABLE);
  },
};
