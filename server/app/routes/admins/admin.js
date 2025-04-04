let express = require("express")
const { isloggedin } = require("../../middlewares/auth")
const { giveAccessTo } = require("../../services/authorization")
const { adminPanel, showUsers, showUsersPage, showBlogsPage } = require("../../controllers/admins/admin")
const { getAllBlogs } = require("../../controllers/users/dashboard")

let adminRoute = express.Router()
adminRoute.get("/admin", isloggedin, giveAccessTo(["ADMIN"]), adminPanel)
adminRoute.get("/admin/users", isloggedin, giveAccessTo(["ADMIN"]), showUsersPage)
adminRoute.get("/admin/showusers", isloggedin, giveAccessTo(["ADMIN"]), showUsers)
adminRoute.get("/admin/blogs", isloggedin, giveAccessTo(["ADMIN"]), showBlogsPage)

module.exports = { adminRoute }