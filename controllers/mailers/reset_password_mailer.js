const nodeMailer = require('../../config/nodemailer');

exports.resetPassword = (resetPasswordToken) => {
    let htmlString = nodeMailer.renderTemplate({ 
        accessToken: resetPasswordToken.accessToken,
        name: resetPasswordToken.user.name
     }, '/reset_password/reset_link.ejs');

    nodeMailer.transporter.sendMail({
        from: 'Codeial',
        to: resetPasswordToken.user.email,
        subject: 'Your Password reset link @ Codeial',
        html: htmlString
    },
        (err, info) => {
            if (err) {
                console.log('Error in sending reset password mail', err);
                return;
            }

            console.log(' reset password mail sent');
        });
}