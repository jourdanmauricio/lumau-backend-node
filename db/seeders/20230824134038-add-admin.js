'use strict';
const bcrypt = require('bcrypt');
const { config } = require('./../../config/config');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const passHash = await bcrypt.hash(config.adminPass, 10);
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: config.adminName,
          email: config.adminEmail,
          password: passHash,
          url: config.adminUrl,
          phone: config.adminPhone,
          dni: config.adminDni,
          deploy: config.adminDeploy,
          attributes: '["contact", "subscriber", "post"]',
          role: config.adminRole,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
