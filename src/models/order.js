'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      senderEmail: DataTypes.STRING,
      fullName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.TEXT,
      service: DataTypes.STRING,
      orderCode: DataTypes.STRING,
      statusId: DataTypes.STRING,
      isDraft: DataTypes.BOOLEAN,
      collectMoney: DataTypes.STRING,
      freightPayer: DataTypes.STRING,
      receivePlace: DataTypes.STRING,
      releaseTime: DataTypes.STRING,
      note: DataTypes.STRING,
      price: DataTypes.INTEGER,
      date: DataTypes.STRING,
      receiverEmail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
