'use strict';
module.exports = (sequelize, DataTypes) => {
  const HeartRate = sequelize.define('HeartRate', {
    value: DataTypes.INTEGER
  }, {});
  HeartRate.associate = function(models) {
    // associations can be defined here
    HeartRate.belongsTo(models.User);
  };
  return HeartRate;
};