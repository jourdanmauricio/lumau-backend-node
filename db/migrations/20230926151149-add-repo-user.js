'use strict';
const { DataTypes } = require('sequelize');
const { USER_TABLE } = require('./../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'repo', {
      allowNull: true,
      type: DataTypes.STRING(255),
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'repo');
  },
};
