'use strict';

const { LessonSchema, LESSON_TABLE } = require('./../models/lesson.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(LESSON_TABLE, LessonSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(LESSON_TABLE);
  },
};
