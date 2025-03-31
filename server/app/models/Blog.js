let mongoose = require('mongoose')
const { userModel } = require('./user')

let BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    }
})

let Blog = new mongoose.model("Blog", BlogSchema)
module.exports = { Blog }