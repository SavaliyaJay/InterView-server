const {Sequelize} = require('sequelize');
const sequelize = require('../Config/db');

const Answer = sequelize.define('Answer', {
    a_id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    answer: {
        type: Sequelize.STRING,
        field: 'answer',
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        field: 'question_id',
        allowNull: false
    },
    u_id: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Answer;