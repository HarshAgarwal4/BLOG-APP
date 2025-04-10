const { Blog } = require('../../models/Blog');
let fs = require('fs');
let path = require('path');
const { deleteBlogImageByBlogUrl } = require('../../services/multerBlog');

async function readBlog(req, res) {
    let BlogId = req.params.id;
    try{
        let Uimage = req.user.path;
        let blog = await Blog.findById(BlogId);
        let Bimage = blog.path;
        let obj = {
            name: req.user.username,
            title: blog.title,
            content: blog.content,
            Uimage: Uimage,
            Bimage: Bimage
        };
        res.render('users/read', obj);
    }catch(err){
        console.log(err);
        res.redirect("/dashboard");
    }
}

async function deleteBlog(req, res) {
    let BlogId = req.params.id;

    try {
        let blog = await Blog.findOneAndDelete({ _id: BlogId });
        if (!blog) {
            return res.send({ status: 0, msg: "Blog not found or already deleted" });
        }
        if (blog.path) {
            try{
            await deleteBlogImageByBlogUrl(blog.path)
            }
            catch(err){
                console.error("Error deleting Blog image from Cloudinary:", err);
            }
        }
        res.send({ status: 1, msg: "Blog deleted successfully" });
    } catch (error) {
        console.error(error);
        res.send({ status: 0, msg: "Something went wrong" });
    }
}

module.exports = { readBlog, deleteBlog };