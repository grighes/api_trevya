const Sequelize = require('sequelize');
const connection = require('../db');
const bcrypt = require('bcrypt');

const User = connection.define('User', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.TEXT,
  }
}, {
    hooks: {
      afterValidate: (user) => {
        user.password = bcrypt.hashSync(user.password, 8);
      }
    }
  })

module.exports = User;