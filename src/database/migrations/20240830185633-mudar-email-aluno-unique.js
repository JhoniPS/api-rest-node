/* eslint-disable no-undef */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'alunos',
      'email',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
    )
  },

  async down() { },
};
