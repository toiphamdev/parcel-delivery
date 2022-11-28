'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ward.hasMany(models.User, {
        foreignKey: 'wardId',
        as: 'wardData',
      });
      Ward.hasMany(models.Order, {
        foreignKey: 'wardId',
        as: 'ward',
      });
    }
  }
  Ward.init(
    {
      wardName: DataTypes.TEXT,
      districtId: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Ward',
    }
  );
  return Ward;
};
