let express = require('express')
const { isloggedin } = require('../../middlewares/auth')    
const { readBlog, deleteBlog } = require('../../controllers/users/Blogs')
let BlogRoute  = express.Router()
let fs = require('fs')
let path = require('path')
const { giveAccessTo } = require('../../services/authorization')

BlogRoute.get("/blog/:id", isloggedin,giveAccessTo(["NORMAL", "ADMIN"]) , readBlog )
BlogRoute.delete("/blog/:id", isloggedin ,giveAccessTo(["NORMAL", "ADMIN"]), deleteBlog )

module.exports = {BlogRoute}