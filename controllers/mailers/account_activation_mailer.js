const nodeMailer = require('../../config/nodemailer');

exports.activateAccount = (inactiveAccount) => {
    let htmlString = nodeMailer.renderTemplate({
        accountActivationToken: inactiveAccount.accountActivationToken,
        name: inactiveAccount.user.name
    }, '/account_activation/new_account_activation.ejs');

    nodeMailer.transporter.sendMail({
        from: 'Codeial',
        to: inactiveAccount.user.email,
        subject: 'Active your account @ Codeial',
        html: htmlString

    }, (err,info) => {
        if (err) {
            console.log('Error in sending account activation mail', err);
            return;
        }

        console.log('account activation mail sent');
    });
}