let express = require('express')
let mongoose = require('mongoose')
let dotenv =  require('dotenv')
let ejs = require('ejs')
let fs = require('fs')
let path =  require('path')

let app = express()
const { homeroutes } = require('./app/routes/users/home')
const { signUproute } = require('./app/routes/users/signup')
const signInRoute = require('./app/routes/users/signin')
const { checkForAuthentication } = require('./app/middlewares/auth')
const { profileRoute } = require('./app/routes/users/profile')
const cookieParser = require('cookie-parser')

dotenv.config()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "app/views")); 
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser())

app.use("/", homeroutes)
app.use("/" , signUproute)
app.use("/", signInRoute)
app.use("/", profileRoute)

mongoose.connect(process.env.DBurl).then(()=> {
    app.listen(process.env.PORT)
})