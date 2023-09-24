const nodemailer = require('nodemailer');
const { config } = require('./config');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: config.emailSend, // generated ethereal user
    pass: config.emailSendPass, // generated ethereal password
  },
});

transporter.verify().then(() => {
  // console.log('Ready for send emails');
});

module.exports = { transporter };
