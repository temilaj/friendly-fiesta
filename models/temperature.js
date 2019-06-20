'use strict';
module.exports = (sequelize, DataTypes) => {
  const Temperature = sequelize.define('Temperature', {
    value: DataTypes.NUMBER
  }, {});
  Temperature.associate = function(models) {
    // associations can be defined here
    Temperature.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: 'userId',
    });
  };
  return Temperature;
};