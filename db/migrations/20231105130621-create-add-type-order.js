'use strict';
const { DataTypes } = require('sequelize');
const { ORDER_TABLE } = require('./../models/order.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(ORDER_TABLE, 'type', {
      allowNull: false,
      defaultValue: 'products',
      type: DataTypes.ENUM(['products', 'print']),
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(ORDER_TABLE, 'type');
  },
};
