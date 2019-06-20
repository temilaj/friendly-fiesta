'use strict';
module.exports = (sequelize, DataTypes) => {
  const Temperature = sequelize.define('Temperature', {
    value: DataTypes.INTEGER
  }, {});
  Temperature.associate = function(models) {
    // associations can be defined here
    Temperature.belongsTo(models.User);
  };
  return Temperature;
};