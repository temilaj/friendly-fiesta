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
    User.hasMany(models.Temperature);
    User.hasMany(models.HeartRate);
    User.hasMany(models.Step);
    User.hasMany(models.Obstacle);
  };
  return User;
};