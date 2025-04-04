let express = require("express")
let dashboardRoute = express.Router()
const { isloggedin } = require("../../middlewares/auth")
const { dashboard, getAllBlogs } = require("../../controllers/users/dashboard")
const { giveAccessTo } = require("../../services/authorization")

dashboardRoute.get("/dashboard" , isloggedin, giveAccessTo(["NORMAL", "ADMIN"]),  dashboard)
dashboardRoute.get("/getallblogs" , isloggedin,giveAccessTo(["NORMAL", "ADMIN"]), getAllBlogs)

module.exports = {dashboardRoute}