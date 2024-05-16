const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_FILEPATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    }
},{
    timestamps: true
});

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname,'..',AVATAR_FILEPATH));
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now());
    }
})

// static method
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_FILEPATH;

const User = mongoose.model('User',userSchema);

module.exports = User;