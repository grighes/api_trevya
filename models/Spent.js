const Sequelize = require('sequelize');
const connection = require('../db');

const Spent = connection.define('Spent', {
  spentName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  spentStatus: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  value: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },

});

module.exports = Spent;
