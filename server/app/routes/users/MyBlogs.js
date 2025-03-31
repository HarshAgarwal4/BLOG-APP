let express = require('express')
const { isloggedin } = require('../../middlewares/auth')
const { MyBlogsPage, CreateBlog, CreateBlogPage, getBlogs } = require('../../controllers/users/MyBlogs')
const { uploadBlogPic, storageBlogPic } = require('../../services/multerBlog')
let MyBlogsRoute = express.Router()

MyBlogsRoute.get("/myblogs", isloggedin, MyBlogsPage)
MyBlogsRoute.get("/getblogs", isloggedin, getBlogs)
MyBlogsRoute.get("/create-blog", isloggedin, CreateBlogPage)
MyBlogsRoute.post("/postblog", isloggedin, uploadBlogPic.single("BlogPic"), CreateBlog)

module.exports = {MyBlogsRoute}