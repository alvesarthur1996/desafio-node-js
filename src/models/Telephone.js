const Sequelize = require('sequelize');
const database = require('../../db');

const Telephone = database.define('Telephone', {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
    },
    area_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    number: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Telephone;
