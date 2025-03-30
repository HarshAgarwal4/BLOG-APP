let express = require('express')
const { home } = require('../../controllers/users/home')
let homeroutes = express.Router()

homeroutes.get("/" , home)

module.exports = {homeroutes}