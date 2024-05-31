const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./Config/db');
const errorHandler = require('./Middleware/errorHandler');
const userRoute = require('./Routes/user.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);

app.use('/user', userRoute);

sequelize.sync().then(() => {
    console.log('Database & tables created!');
});

const corsOptions = {
    origin: 'http://localhost:4000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port ${process.env.PORT || 3001}`);
});
