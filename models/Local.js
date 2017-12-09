const Sequelize = require('sequelize');
const connection = require('../db');

const Local = connection.define('Local', {
  localName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },

});

module.exports = Local;
