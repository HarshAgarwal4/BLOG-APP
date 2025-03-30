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
            res.render("users/dashboard" , {name: findUser.username, image: findUser.path})
        }else{
            res.send({status: 0, msg: "invalid email or password"})
        }
    }else{
        res.send({status: 0, msg: "invalid email or password"})
    }
}

function signInPage(req,res){
    res.render("users/signin")
}

module.exports = {signIn, signInPage}