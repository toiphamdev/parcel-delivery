'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.MailOTP, {
        foreignKey: 'userEmail',
        as: 'userData',
      });
      User.belongsTo(models.Province, {
        foreignKey: 'provinceId',
        targetKey: 'id',
        as: 'provinceData',
      });
      User.belongsTo(models.District, {
        foreignKey: 'districtId',
        targetKey: 'id',
        as: 'districtData',
      });
      User.belongsTo(models.Ward, {
        foreignKey: 'wardId',
        targetKey: 'id',
        as: 'wardData',
      });
      User.belongsTo(models.Order, {
        foreignKey: 'email',
        targetKey: 'senderEmail',
        as: 'senderData',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.TEXT,
      birthDay: DataTypes.STRING,
      idTax: DataTypes.STRING,
      permanentAddress: DataTypes.TEXT,
      isLogin: DataTypes.BOOLEAN,
      address: DataTypes.TEXT,
      service: DataTypes.STRING,
      roleId: DataTypes.STRING,
      storageId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      districtId: DataTypes.STRING,
      wardId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
