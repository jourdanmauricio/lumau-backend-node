'use strict';

const { NetworkSchema, NETWORK_TABLE } = require('./../models/network.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(NETWORK_TABLE, NetworkSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(NETWORK_TABLE);
  },
};
