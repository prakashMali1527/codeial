const nodeMailer = require('../../config/nodemailer');

exports.newAccount = (user) => {
    let htmlString = nodeMailer.renderTemplate({ user: user }, '/signUp/new_account.ejs');
    nodeMailer.transporter.sendMail({
        from: 'Codeial',
        to: user.email,
        subject: "Welcome to codeial",
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Account mail sent');
    })
}