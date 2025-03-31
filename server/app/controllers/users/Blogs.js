const { Blog } = require('../../models/Blog');
let fs = require('fs');
let path = require('path');

async function readBlog(req, res) {
    let BlogId = req.params.id;
    let Uimage = `/` + req.user.path;
    let blog = await Blog.findById(BlogId);
    let Bimage = `/` + blog.path;
    let obj = {
        name: req.user.username,
        title: blog.title,
        content: blog.content,
        Uimage: Uimage,
        Bimage: Bimage
    };
    res.render('users/read', obj);
}

async function deleteBlog(req, res) {
    let BlogId = req.params.id;
    
    try {
        let dele = await Blog.deleteOne({ _id: BlogId });
        console.log(dele);

        if (dele.deletedCount === 1) {
            res.send({ status: 1, msg: "Blog deleted successfully" });
        } else {
            res.send({ status: 0, msg: "Blog not found or already deleted" });
        }
    } catch (error) {
        console.error(error);
        res.send({ status: 0, msg: "Something went wrong" });
    }
}


module.exports = { readBlog , deleteBlog};