const ResetPasswordToken = require('../models/reset_password_token');
const User = require('../models/user');

module.exports.resetPasswordGet = async function(req,res){
    let tokenStatus;
    try{
        let resetPasswordToken = await ResetPasswordToken.findOne({accessToken: req.query.accessToken});

        if(resetPasswordToken){
            if(resetPasswordToken.isValid){
                tokenStatus = 'valid';
            }else{
                tokenStatus = 'expired';
            }
        }else{
            tokenStatus = 'invalid';
        }

        return res.render('reset_password',{
            accessToken: req.query.accessToken,
            tokenStatus: tokenStatus
        });
    }catch(err){
        console.log('Server error in finding access token');
        req.flash('error','Server error!');
        return res.redirect('back');
    }
};

module.exports.resetPasswordPost = async function(req,res){

    let {password , confirmPassword, accessToken} = req.body;

    if(password != confirmPassword){
        req.flash('error', 'Password mismatch!');
        return res.redirect('back');
    }

    let resetPasswordToken = await ResetPasswordToken.findOne({accessToken: accessToken});

    if(!resetPasswordToken.isValid){
        req.flash('error', 'Reset link got expired');
        return res.redirect('back');
    }

    let user = await User.findById(resetPasswordToken.user);

    // changin user password and expiring accessToken
    user.password = password;
    user.save();
    resetPasswordToken.isValid = false;
    resetPasswordToken.save();
    
    req.flash('success', 'Password reset successfully!!!');
    return res.redirect('/signin');
};

