var nodemailer = require('nodemailer');

function mailVerifier(recipient, subject, text){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: '201400124@gift.edu.pk',
            pass: '$BEAST$GAMER$'
        }
    });
    
    var mailOptions = {
      from: '201400124@gift.edu.com',
      to: recipient,
      subject: subject,
      text: text
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log(info)
        console.log('Email sent: ' + info.response);
        return info.response
      }
    });
}

module.exports = mailVerifier