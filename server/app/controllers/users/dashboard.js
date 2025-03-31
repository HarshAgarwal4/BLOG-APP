const { Blog } = require("../../models/Blog");

function dashboard(req,res){
    res.render('users/dashboard', {name: req.user.username , image:req.user.path})
}

async function getAllBlogs(req, res) {
    try {
        let blogs = await Blog.find();
        if (blogs.length > 0) {
            res.json({ status: 1, blogs });
        } else {
            res.json({ status: 0, msg: "No blogs found" });
        }
    } catch (error) {
        console.log("Error fetching blogs:", error);
        res.status(500).json({ status: 0, msg: "Server error. Try again later." });
    }
}


module.exports = {dashboard, getAllBlogs}