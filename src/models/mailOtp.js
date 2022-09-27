'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MailOTP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MailOTP.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'userData',
      });
    }
  }
  MailOTP.init(
    {
      OTP: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      expiredIn: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'MailOTP',
    }
  );
  return MailOTP;
};
