// Assign variables
const express = require("express")

const router = express.Router()

// Routes for login page
router.get('/login', (req, res) => { res.render('login') })
router.post('/login', (req, res) => { })

// Routes for register page
router.get('/register', (req, res) => { res.render('register') })


module.exports = router