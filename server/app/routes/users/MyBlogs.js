let express = require('express')
const { isloggedin } = require('../../middlewares/auth')
const { MyBlogsPage, CreateBlog, CreateBlogPage, getBlogs } = require('../../controllers/users/MyBlogs')
const { uploadBlogPic, storageBlogPic } = require('../../services/multerBlog')
const { giveAccessTo } = require('../../services/authorization')
let MyBlogsRoute = express.Router()

MyBlogsRoute.get("/myblogs", isloggedin,giveAccessTo(["NORMAL", "ADMIN"]), MyBlogsPage)
MyBlogsRoute.get("/getblogs", isloggedin,giveAccessTo(["NORMAL", "ADMIN"]), getBlogs)
MyBlogsRoute.get("/create-blog", isloggedin,giveAccessTo(["NORMAL", "ADMIN"]), CreateBlogPage)
MyBlogsRoute.post("/postblog", isloggedin,giveAccessTo(["NORMAL", "ADMIN"]), uploadBlogPic.single("BlogPic"), CreateBlog)

module.exports = {MyBlogsRoute}