'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.CheckIn, {
        foreignKey: 'Email',
        as: 'checkIns'
      });
    }
  };
  Users.init({
    FirstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    LastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Address: Sequelize.STRING,
    City: Sequelize.STRING,
    ZipCode: Sequelize.INTEGER,
    Phone: Sequelize.STRING,
    Email: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};