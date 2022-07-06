require('dotenv').config();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    });

module.exports = transporter;
