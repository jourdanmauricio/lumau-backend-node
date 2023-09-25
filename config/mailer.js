const nodemailer = require('nodemailer');
const { config } = require('./config');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: config.emailPort,
  secure: config.emailSecure, // true for 465, false for other ports
  auth: {
    user: config.emailSend, // generated ethereal user
    pass: config.emailSendPass, // generated ethereal password
  },
});

transporter.verify().then(() => {
  // eslint-disable-next-line no-console
  console.log('Ready for send emails');
});

module.exports = { transporter };
