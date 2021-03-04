'use strict';
const {
  Model
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
    }
  };
  Users.init({
    admin: DataTypes.BOOLEAN,
    clientDashboard: DataTypes.BOOLEAN,
    company: DataTypes.INTEGER,
    email: DataTypes.STRING,
    employeeDashboard: DataTypes.BOOLEAN,
    firstName: DataTypes.STRING,
    hourlyRate: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};