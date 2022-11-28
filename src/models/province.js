'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Province.hasMany(models.User, {
        foreignKey: 'provinceId',
        as: 'provinceData',
      });
      Province.hasMany(models.Order, {
        foreignKey: 'provinceId',
        as: 'province',
      });
    }
  }
  Province.init(
    {
      provinceName: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Province',
    }
  );
  return Province;
};
