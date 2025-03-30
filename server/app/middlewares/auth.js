const { getuser } = require("../services/auth");


function isloggedin(req, res, next) {
    const userId = req.cookies?.UID; 
    if (!userId) return res.redirect('/signIn');
    
    let user = getuser(userId);
    if (!user) return res.redirect('/signIn');

    req.user = user;
    next();
}

module.exports = { isloggedin };
