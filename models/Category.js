const Sequelize = require('sequelize');
const connection = require('../db');

const Category = connection.define('Category', {
  categoryName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  subCategory: {
    type: Sequelize.STRING,
    allowNull: false,
  },

});

module.exports = Category;
