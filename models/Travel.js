const Sequelize = require('sequelize')
const connection = require('../db')

const Travel = connection.define('Travel', {
  travelName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
  budget: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  beginDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  cityStart: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Travel;