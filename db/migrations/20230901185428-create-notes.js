'use strict';

const { NoteSchema, NOTE_TABLE } = require('./../models/note.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(NOTE_TABLE, NoteSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(NOTE_TABLE);
  },
};
