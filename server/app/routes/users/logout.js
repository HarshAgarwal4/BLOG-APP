let express = require('express')    
let logoutRoute = express.Router()
const { isloggedin } = require('../../middlewares/auth')
const { logout } = require('../../controllers/users/logout')
const { giveAccessTo } = require('../../services/authorization')

logoutRoute.get("/logout" , isloggedin,giveAccessTo(["NORMAL", "ADMIN"]), logout)

module.exports = {logoutRoute}