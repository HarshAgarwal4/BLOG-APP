require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
let cors = require('cors')

const { homeroutes } = require('./app/routes/users/home');
const { signUproute } = require('./app/routes/users/signup');
const signInRoute = require('./app/routes/users/signin');
const { profileRoute } = require('./app/routes/users/profile');
const { MyBlogsRoute } = require('./app/routes/users/MyBlogs');
const { BlogRoute } = require('./app/routes/users/Blogs');
const { dashboardRoute } = require('./app/routes/users/dashboard');
const { logoutRoute } = require('./app/routes/users/logout');

const app = express();

// Middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "app/views")); 
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use("/", homeroutes);
app.use("/", signUproute);
app.use("/", signInRoute);
app.use("/", profileRoute);
app.use("/", MyBlogsRoute);
app.use("/", BlogRoute);
app.use("/", dashboardRoute);
app.use("/", logoutRoute);

// MongoDB Connection
const DB_URL = process.env.DB_URL;

if (!DB_URL) {
    console.error("MongoDB Connection String is missing in .env file");
    process.exit(1);
}

mongoose.connect(DB_URL, {
    dbName: "BlogAPP",
})
.then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
})
.catch(err => {
    console.error("MongoDB Connection Error:", err);
});
