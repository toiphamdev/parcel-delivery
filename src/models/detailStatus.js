'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DetailStatus.init(
    {
      orderCode: DataTypes.STRING,
      senderEmail: DataTypes.STRING,
      orderId: DataTypes.STRING,
      statusId: DataTypes.STRING,
      verifierEmail: DataTypes.STRING,
      date: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'DetailStatus',
    }
  );
  return DetailStatus;
};
