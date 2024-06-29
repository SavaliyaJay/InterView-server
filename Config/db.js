const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports =sequelize;

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(process.env.DB_URL, {
//     dialect: 'postgres'
// });

// try {
//     sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// }
// catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

// module.exports = sequelize;

