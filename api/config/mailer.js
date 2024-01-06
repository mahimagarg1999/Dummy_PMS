// const nodemailer = require('nodemailer');

// // Create a transporter object using SMTP transport
// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'mahima1602@gmail.com',
//     pass: 'uixv laul bjpd tqcc'
//   }
// });

// // Setup email data with unicode symbols
// let mailOptions = {
//   from: 'mahima1602@gmail.com', // sender address
//   to: 'rss074.mahima@gmail.com', // list of receivers
//   subject: 'Hello ✔', // Subject line
//   text: 'Hello world?', // plain text body
//   html: '<b>Hello world?</b>' // html body
// };

// // Send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log('Message sent: %s', info.messageId);
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// });