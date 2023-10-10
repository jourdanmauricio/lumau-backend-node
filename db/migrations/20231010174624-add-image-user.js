'use strict';
const { DataTypes } = require('sequelize');
const { USER_TABLE } = require('./../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'image', {
      allowNull: true,
      type: DataTypes.STRING(250),
    });
    await queryInterface.addColumn(USER_TABLE, 'alt_image', {
      allowNull: true,
      type: DataTypes.STRING(250),
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'image');
    await queryInterface.removeColumn(USER_TABLE, 'alt_image');
  },
};
