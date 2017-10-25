const Sequelize = require('sequelize')
const connection = require('../db')
// const bcrypt = require('bcrypt')

const User = connection.define('User', {
  userName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  tokenId: {
    type: Sequelize.STRING,
  }
});

module.exports = User;