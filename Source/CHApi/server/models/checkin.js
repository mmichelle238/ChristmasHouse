'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CheckIn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CheckIn.belongsTo(models.users, {
        foreignKey: 'Email'
      });
    }
  };
  
  CheckIn.init({
    CheckIn: {
      type: Sequelize.DATE,
      allowNull: false
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CheckIn',
  });

  return CheckIn;
};