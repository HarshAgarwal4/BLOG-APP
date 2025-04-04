let mongoose =  require('mongoose');
const { hashPassword } = require('../services/encryption');

let userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    path:{
        type:String,
        default: "/assets/images/default-profile.png"     
    },
    about:{
        type:String,
        default: "You have not added any about yet"
    },
    dob:{
        type: Date
    },
    role:{
        type: String,
        required: true,
        default: "NORMAL"
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();  
    let r = await hashPassword(this.password)
    this.password = r;
    next();  
});

let userModel = new mongoose.model('user' , userSchema)
module.exports = {userModel}