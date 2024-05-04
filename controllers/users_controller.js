module.exports.profile = function(req, res) {
    res.end('<h1> User Profile</h1>');
}

module.exports.post = function(req,res){
    res.end('<h1>User Post</h1>');
}

module.exports.friends = function(req,res){
    res.send('<ul> <li> friend List </li> </ul>');
}