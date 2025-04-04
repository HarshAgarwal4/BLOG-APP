const { userModel } = require("../../models/user")

function adminPanel(req,res){
    res.render('admins/admin' , {image : req.user.path , name: req.user.name, email: req.user.email, about: req.user.about, username: req.user.username, role: req.user.role})
}

function showUsersPage(req,res){
    res.render('admins/users')
}
function showBlogsPage(req,res){
    res.render('admins/blogs')
}

async function showUsers(req,res){ 
    try{
        let users = await userModel.find()
        if(users.length > 0){
            res.send({status: 1, users: users})
        }else{
            res.send({status: 0, msg: "No users found"})
        }
    }catch(err){
        console.log(err)
        res.send({status: 0, msg: "No users found"})
    }
}

module.exports = { adminPanel , showUsers, showUsersPage , showBlogsPage}