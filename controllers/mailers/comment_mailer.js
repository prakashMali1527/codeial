const nodeMailer = require('../../config/nodemailer');

exports.newComment = (comment) => {
    nodeMailer.transporter.sendMail({
        from: "prakash.dakshana@gmail.com",
        to: comment.user.email,
        subject: 'new commnet published',
        html: "<h1>your comment has been published!</h1>"
    }, (err, info) => {
        if (err) {
            console.log('Error in sending mail', err);
            return;
        }

        console.log('comment mail sent', info);
    });
}
