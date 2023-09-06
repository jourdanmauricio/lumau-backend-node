'use strict';

const { LoanSchema, LOAN_TABLE } = require('./../models/loan.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(LOAN_TABLE, LoanSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(LOAN_TABLE);
  },
};
