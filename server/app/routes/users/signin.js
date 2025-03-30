let express = require("express")
const { signIn, signInPage } = require("../../controllers/users/signin")
let signInRoute = express.Router()

signInRoute.get("/signIn" , signInPage)
signInRoute.post("/signIn", signIn)

module.exports = signInRoute