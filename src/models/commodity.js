'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commodity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Commodity.belongsTo(models.Order, {
        foreignKey: 'orderKey',
        targetKey: 'keyId',
        as: 'commodityData',
      });
    }
  }
  Commodity.init(
    {
      name: DataTypes.STRING,
      weight: DataTypes.INTEGER,
      amount: DataTypes.TEXT,
      value: DataTypes.STRING,
      orderCode: DataTypes.STRING,
      senderEmail: DataTypes.STRING,
      orderKey: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Commodity',
    }
  );
  return Commodity;
};
