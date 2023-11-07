'use strict';
const { DataTypes } = require('sequelize');
const { USER_TABLE } = require('./../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'instagram_token', {
      allowNull: true,
      type: DataTypes.STRING(),
    });
    await queryInterface.addColumn(USER_TABLE, 'instagram_user', {
      allowNull: true,
      type: DataTypes.STRING(),
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'instagram_token');
    await queryInterface.removeColumn(USER_TABLE, 'instagram_user');
  },
};
