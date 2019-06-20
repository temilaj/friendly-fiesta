'use strict';
module.exports = (sequelize, DataTypes) => {
  const Obstacle = sequelize.define('Obstacle', {
    distance: DataTypes.INTEGER
  }, {});
  Obstacle.associate = function(models) {
    // associations can be defined here
    Obstacle.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: 'userId',
    });
  };
  return Obstacle;
};