const Sequelize = require('sequelize');
const {sequelize} = require('../Config/db');

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
        field: 'question_id',
        allowNull: false
    },
    subCategoryId: {
        type: Sequelize.INTEGER,
        field: 'sub_category_id',
        allowNull: false
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Question;