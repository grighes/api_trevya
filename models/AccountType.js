const Sequelize = require('sequelize');
const connection = require('../db');

const AccountType = connection.define('AccountType', {
  accountTypeName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = AccountType;
