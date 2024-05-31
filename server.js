const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
// require('./syncModels'); 
const sequelize = require('./Config/db');
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});

const app = express();

const corsOptions = {
    origin: 'http://localhost:4000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port ${process.env.PORT || 3001}`);
});
