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
        foreignKey: 'userEmail',
        targetKey: 'email',
        as: 'userData',
      });
    }
  }
  MailOTP.init(
    {
      OTP: DataTypes.STRING,
      userEmail: DataTypes.STRING,
      expiredIn: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'MailOTP',
    }
  );
  return MailOTP;
};
