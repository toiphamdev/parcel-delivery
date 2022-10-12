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
    }
  }
  Commodity.init(
    {
      name: DataTypes.STRING,
      weight: DataTypes.STRING,
      amount: DataTypes.TEXT,
      value: DataTypes.STRING,
      orderCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Commodity',
    }
  );
  return Commodity;
};
