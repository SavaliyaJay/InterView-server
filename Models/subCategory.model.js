const { Sequelize} = require('sequelize');
const sequelize = require('../Config/db');

const SubCategory = sequelize.define('SubCategory', {
    sc_id: {
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
    },
    c_id: {
        type: Sequelize.INTEGER,
        field: 'category_id',
        allowNull: false
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = SubCategory;