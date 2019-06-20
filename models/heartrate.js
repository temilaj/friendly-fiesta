'use strict';
module.exports = (sequelize, DataTypes) => {
  const HeartRate = sequelize.define('HeartRate', {
    value: DataTypes.NUMBER
  }, {});
  HeartRate.associate = function(models) {
    // associations can be defined here
    HeartRate.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: 'userId',
    });
  };
  return HeartRate;
};