'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const userRoutes = require('./routes/users-routes');
const consumeRoutes = require('./routes/consumption-routes');
const previousYearRoutes = require('./routes/previous-year-data-routes');

const port = process.env.PORT || 8080;
require('./db/database')();

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes);
app.use('/consume', consumeRoutes);
app.use('/previousyear', previousYearRoutes);

app.listen(port, () => console.log(`server is listening on url http://localhost:${port}`));