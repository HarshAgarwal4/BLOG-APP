let express = require("express")
let dashboardRoute = express.Router()
const { isloggedin } = require("../../middlewares/auth")
const { dashboard, getAllBlogs } = require("../../controllers/users/dashboard")

dashboardRoute.get("/dashboard" , isloggedin, dashboard)
dashboardRoute.get("/getallblogs" , isloggedin, getAllBlogs)

module.exports = {dashboardRoute}