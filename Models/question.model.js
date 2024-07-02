const { Sequelize } = require('sequelize');
const sequelize = require('../Config/db');
const SubCategory = require('./subCategory.model');

const Question = sequelize.define('Question', {
    q_id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    question: {
        type: Sequelize.STRING,
        field: 'question',
        allowNull: false
    },
    subCategoryId: {
        type: Sequelize.INTEGER,
        field: 'subCategoryId',
        allowNull: false,
        validate: {
            notNull: { args: true, msg: "You must enter a name" }
        }, references: {
            model: SubCategory,
            key: 'id'
        }
    },

}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Question.belongsTo(SubCategory, { foreignKey: 'subCategoryId', as: 'subCategory' });

module.exports = Question;