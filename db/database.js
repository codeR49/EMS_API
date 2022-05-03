'use strict';
require("dotenv").config()
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to Mongodb......')
    }, (err) => { console.log(err); });
}