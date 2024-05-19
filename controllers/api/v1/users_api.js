const jwt = require('jsonwebtoken');

const User = require('../../../models/user');

module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: "Invalid Username or Password"
            });
        }

        return res.status(200).json({
            message: "Signed in successfully, here is your token, keep it safe!",
            data: {
                token: jwt.sign(user.toJSON(), 'mukemboCodeial', {expiresIn: '100000'})
            }
        });

    }catch(err){
        console.log("********",err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}