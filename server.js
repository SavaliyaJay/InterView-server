const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./Config/db');
const errorHandler = require('./Middleware/errorHandler');
const userRoute = require('./Routes/user.route');
const categoryRoute = require('./Routes/category.route');
const subCategoryRoute = require('./Routes/subCategory.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);
const corsOpts = {
    origin: '*',
};

app.use(cors(corsOpts));

app.use('/v1/auth/', userRoute);
app.use('/v1/category/', categoryRoute);
app.use('/v1/subcategory/', subCategoryRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
});

sequelize.sync().then(() => {
    console.log('Database & tables created!');
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port ${process.env.PORT || 3001}`);
});
