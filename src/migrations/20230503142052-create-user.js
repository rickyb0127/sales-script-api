'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('User', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      email: Sequelize.STRING,
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      password: Sequelize.STRING,
      phone: Sequelize.STRING,
      address1: Sequelize.STRING,
      address2: Sequelize.STRING,
      city: Sequelize.STRING,
      state: Sequelize.STRING,
      zip: Sequelize.STRING,
      companyName: Sequelize.STRING,
      roles: Sequelize.JSONB,
      settings: Sequelize.JSONB,
      isActive: Sequelize.BOOLEAN,
      paymentStatus: Sequelize.STRING,
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
  down (queryInterface, Sequelize) {
    return queryInterface.dropTable('User');
  }
};
