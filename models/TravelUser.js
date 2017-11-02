// const Sequelize = require('sequelize');
const connection = require('../db');
const User = require('../models/User');
const Travel = require('../models/Travel');

// We'll define associations after we import them here
// Travel.belongsToMany(User, { through: 'travelsUser' });
// User.belongsToMany(Travel, { through: 'travelsUser' });

const TravelUser = connection.define('travelUser', {});
TravelUser.belongsTo(Travel);
TravelUser.belongsTo(User);


module.exports = TravelUser;
