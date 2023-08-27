'use strict';

const {
  SubscriberSchema,
  SUBSCRIBER_TABLE,
} = require('./../models/subscriber.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(SUBSCRIBER_TABLE, SubscriberSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(SUBSCRIBER_TABLE);
  },
};
