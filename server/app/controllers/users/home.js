function home(req, res) {
    let cookies = req.cookies?.UID;
    if (cookies) {
        res.clearCookie('UID'); 
    }
    res.render("users/home");
}

module.exports = { home };
