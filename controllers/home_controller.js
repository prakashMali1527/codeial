module.exports.home = function(req, res) {
    console.log(req.cookies);
    res.cookie('fruit','pineapple');
    res.render('home', { title: 'home' });
}
