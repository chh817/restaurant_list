// Assign variables
const express = require("express")

const router = express.Router()

const home = require("./modules/home")

const restaurants = require("./modules/restaurants")

// Guiding request into route
router.use("/", home)

router.use('/restaurants', restaurants)













module.exports = router