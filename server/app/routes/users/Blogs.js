let express = require('express')
const { isloggedin } = require('../../middlewares/auth')    
const { readBlog, deleteBlog } = require('../../controllers/users/Blogs')
let BlogRoute  = express.Router()
let fs = require('fs')
let path = require('path')

BlogRoute.get("/blog/:id", isloggedin , readBlog )
BlogRoute.delete("/blog/:id", isloggedin , deleteBlog )

module.exports = {BlogRoute}