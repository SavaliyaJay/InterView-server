const { Sequelize } = require('sequelize');
const sequelize = require('../Config/db');

const Category = sequelize.define('Category', {
    c_id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: false
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Category;
