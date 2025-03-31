const { Blog } = require("../../models/Blog")

function MyBlogsPage(req,res){
    res.render('users/myblogs', {name: req.user.username , image: req.user.path})
}

function CreateBlogPage(req,res){
    res.render('users/createblog', {name: req.user.username , image: req.user.path})
}


const fs = require("fs");

async function CreateBlog(req, res) {
    try {
        let { title, content } = req.body;
        if (!title || !content) {
            if (req.file) fs.unlink(req.file.path, (err) => { if (err) console.error("File deletion error:", err); });
            return res.send({ status: 0, msg: "Title and content are required!" });
        }
        let BlogData = {
            title,
            content,
            userId: req.user.id,
            path: req.file ? req.file.path : null
        };
        let blog = new Blog(BlogData);
        await blog.save();

        res.send({ status: 1, msg: "Blog posted successfully" });
    } catch (err) {
        console.log(err);
        if (req.file) fs.unlink(req.file.path, (error) => { if (error) console.error("Error deleting file:", error); });
        res.send({ status: 0, msg: "Something went wrong" });
    }
}


async function getBlogs(req,res){
    let blogs = await Blog.find({userId: req.user.id})
    if(blogs.length > 0){
        res.send({status:1, blogs: blogs})
    }
    else if(blogs.length == 0){
        res.send({status:1, blogs:[]})
    } else{
        res.send({status:0, msg: "No blogs found"})
    }
}

module.exports = {MyBlogsPage, CreateBlog, CreateBlogPage, getBlogs}