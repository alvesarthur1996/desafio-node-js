const Sequelize = require('sequelize');

const DB = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

module.exports = DB;
