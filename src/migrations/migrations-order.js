'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      senderEmail: {
        type: Sequelize.STRING,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },
      service: {
        type: Sequelize.STRING,
      },
      orderCode: {
        type: Sequelize.STRING,
      },
      isDraft: {
        type: Sequelize.BOOLEAN,
      },
      collectMoney: {
        type: Sequelize.STRING,
      },
      freightPayer: {
        type: Sequelize.STRING,
      },
      receivePlace: {
        type: Sequelize.STRING,
      },
      statusId: {
        type: Sequelize.STRING,
      },
      releaseTime: {
        type: Sequelize.STRING,
      },
      note: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};
