'use strict';
module.exports = (sequelize, DataTypes) => {
  const Step = sequelize.define('Step', {
    value: DataTypes.INTEGER
  }, {});
  Step.associate = function(models) {
    // associations can be defined here
    Step.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: 'userId',
    });
  };
  return Step;
};