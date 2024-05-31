const { Sequelize } = require('sequelize');
const sequelize = require('../Config/db');
const constant = {
    ADMIN: "0",
    USER: "1"
}

const User = sequelize.define('User', {
        u_id: {
            type: Sequelize.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            field: 'name',
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            field: 'email',
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            field: 'password',
            allowNull: false
        },
        role: {
            type: Sequelize.ENUM(constant.ADMIN, constant.USER),
            field: 'role',
            defaultValue: constant.USER,
            allowNull: false
        }
}, {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = User;
