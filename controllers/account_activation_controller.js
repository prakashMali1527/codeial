const InactiveAccount = require('../models/inactive_account');

module.exports.activateAccount = async function (req, res) {
    let { accountActivationToken } = req.query;

    try {
        let inactiveAccount = await InactiveAccount.findOne({ accountActivationToken: accountActivationToken });

        if (inactiveAccount) {
            if(inactiveAccount.isActive){
                req.flash('error', 'Account already activated');
            }else{
                req.flash('success', 'Account activated!');
                inactiveAccount.isActive = true;
                inactiveAccount.save();
            }
        }else{
            req.flash('error', 'Invalid Link');
        }

    } catch (err) {
        console.log('Server error in finding inactive account', err);
        req.flash('error', 'Server error');
    }
    return res.redirect('/');
}