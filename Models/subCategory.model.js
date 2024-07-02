
const { Sequelize } = require('sequelize');
const sequelize = require('../Config/db');
const Category = require('./category.model');

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
        field: 'c_id',
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

SubCategory.belongsTo(Category, { foreignKey: 'c_id', as: 'category' });

module.exports = SubCategory;
