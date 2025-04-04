const { name } = require("ejs")
let jwt = require("jsonwebtoken")
require('dotenv').config()

let secretkey = process.env.SECRET

function setUser(user){
    let payload = {
        id: user._id,
        email: user.email,
        name: user.name,
        username: user.username,
        dob: user.dob,
        about: user.about,
        path: user.path,
        role: user.role
    }
    
    let token = jwt.sign(payload , secretkey)
    return token
}

function getuser(token){
    if(!token) return null;
    try{
        let verify = jwt.verify(token,secretkey)
        return verify
    }
    catch(err){
        return null
    }
}

module.exports = {getuser, setUser}