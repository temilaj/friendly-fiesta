'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    long: DataTypes.DOUBLE,
    lat: DataTypes.DOUBLE
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Temperature, {
      foreignKey: 'userId',
      as: 'temperatures'
    });
    User.hasMany(models.HeartRate, {
      foreignKey: 'userId',
      as: 'heartRates'
    });
  };
  return User;
};