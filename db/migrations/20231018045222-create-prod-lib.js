'use strict';

const { ProdLibSchema, PROD_LIB_TABLE } = require('./../models/prodLib.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(PROD_LIB_TABLE, ProdLibSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(PROD_LIB_TABLE);
  },
};
