const { userModel } = require("../../models/user")
const { setUser } = require("../../services/auth")
const { verifyPassword } = require("../../services/encryption")

async function signIn(req,res) {
    let {email, password} = req.body
    const findUser = await userModel.findOne({email: email})
    if(findUser){
        let r = await verifyPassword(password, findUser.password)
        if(r.status === 1){
            let token = setUser(findUser)
            res.cookie('UID', token, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict"
            });
            if(findUser.role === "NORMAL"){
                res.redirect('/dashboard')  
            }else{
                res.redirect("/admin")
            }
        }else{
            res.redirect("/signIn")
        }
    }else{
        res.redirect("/signIn")
    }
}

function signInPage(req,res){
    let cookies = req.cookies?.UID;
    if (cookies) {
        res.clearCookie('UID'); 
    }
    res.render("users/signin")
}

module.exports = {signIn, signInPage}