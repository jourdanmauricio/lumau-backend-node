'use strict';

const { ContactSchema, CONTACT_TABLE } = require('./../models/contact.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CONTACT_TABLE, ContactSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CONTACT_TABLE);
  },
};
