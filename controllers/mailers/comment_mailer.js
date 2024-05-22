const nodeMailer = require('../../config/nodemailer');

exports.newComment = (comment) => {

    let htmlString = nodeMailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: "Codeial",
        to: comment.user.email,
        subject: 'new commnet published',
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log('Error in sending mail', err);
            return;
        }

        console.log('comment mail sent');
    });
}
