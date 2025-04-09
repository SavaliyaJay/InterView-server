// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'postgres'
// });

// try {
//     sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

// module.exports =sequelize;

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


const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(process.env.DB_URL, {
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true, // This ensures SSL is required
//             rejectUnauthorized: false // Set to false if you don't have a CA certificate
//         }
//     }
// });

// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// })();

// module.exports = sequelize;

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      connectTimeout: 60000 // Increase timeout to 60 seconds
    },
    pool: {
      acquire: 60000 // Also increase pool acquisition timeout
    }
  });

  module.exports = sequelize;