const User = require('../models/user');

module.exports.profile = function (req, res) {

    User.findById(req.params.id)
    .then((user)=>{
        res.render('user_profile', { 
            title: 'profile',
            profile_user: user 
        });
    }).catch((err)=>{
        console.log(`Error: ${err}`);
    })
}

module.exports.update = async function(req,res){

    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.user.id);
            
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('******Multer Error: ', err);
                }

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    // saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();

                req.flash('success','User profile got updated');
                
                return res.redirect('back');
            })

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }

    }else {
        req.flash('error',"Cannot update other's profile");
        return res.status(401).send('Unauthorized');
    }
}

module.exports.posts = function (req, res) {
    res.end('<h1>User Post</h1>');
}

module.exports.friends = function (req, res) {
    res.send('<ul> <li> friend List </li> </ul>');
}

// Sign Out user and destroy Session
module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            console.log('Error in signing out or destroyingSession');
        }
        req.flash('success','You have Logged Out!');
        return res.redirect('/signin');
    });
}
