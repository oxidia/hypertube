const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendEmail = (from, to, subject, body) => {
  transporter.sendMail(
    {
      from,
      to,
      subject,
      html: body
    },
    (err, info) => {
      if (err) return reject(err);

      resolve(info);
    }
  );
};
