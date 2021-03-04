'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admin: {
        type: Sequelize.BOOLEAN
      },
      clientDashboard: {
        type: Sequelize.BOOLEAN
      },
      email: {
        type: Sequelize.STRING
      },
      employeeDashboard: {
        type: Sequelize.BOOLEAN
      },
      firstName: {
        type: Sequelize.STRING
      },
      hourlyRate: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      userType: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};