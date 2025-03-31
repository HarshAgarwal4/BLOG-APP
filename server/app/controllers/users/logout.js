const { setUser } = require("../../services/auth");

function logout(req,res){
    let userId = req.cookies?.UID;
    if(userId){
        setUser(userId , null);
        res.clearCookie('UID')
    }
    res.redirect("/")
}

module.exports = {logout}