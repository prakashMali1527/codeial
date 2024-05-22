const queue = require('../config/kue');
const commentMailer = require('../controllers/mailers/comment_mailer');
const postMailer = require('../controllers/mailers/post_mailer');
const signUp_mailer = require('../controllers/mailers/signUp_mailer');

queue.process('emails', function(job, done){
    let jobType = Object.keys(job.data)[0];
    if(jobType == null)
        return;
    if(jobType == 'comment'){
        commentMailer.newComment(job.data.comment);
    }else if(jobType == 'post'){
        postMailer.newPost(job.data.post);
    }else if(jobType == 'signup'){
        signUp_mailer.newAccount(job.data.signup);
    }
    done();
});