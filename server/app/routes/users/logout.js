let express = require('express')    
let logoutRoute = express.Router()
const { isloggedin } = require('../../middlewares/auth')
const { logout } = require('../../controllers/users/logout')

logoutRoute.get("/logout" , isloggedin, logout)

module.exports = {logoutRoute}