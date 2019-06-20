'use strict';
module.exports = (sequelize, DataTypes) => {
  const Steps = sequelize.define('Steps', {
    value: DataTypes.NUMBER
  }, {});
  Steps.associate = function(models) {
    // associations can be defined here
    Obstacle.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: 'userId',
    });
  };
  return Steps;
};