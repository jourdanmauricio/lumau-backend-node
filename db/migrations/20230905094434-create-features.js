'use strict';

const { FeatureSchema, FEATURE_TABLE } = require('./../models/feature.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(FEATURE_TABLE, FeatureSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(FEATURE_TABLE);
  },
};
