function giveAccessTo(roles = []) {
    return function (req, res, next) {
        if (!req.user || !req.user.role) {
            return res.redirect('/');
        }
        if (!roles.includes(req.user.role)) {
            return res.redirect('/');
        }
        next();
    };
}

module.exports = { giveAccessTo };
