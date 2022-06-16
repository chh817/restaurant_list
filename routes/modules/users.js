// Assign variables
const express = require("express")

const router = express.Router()

// Route for login page
router.get('/login', (req, res) => { res.render('login') })

router.post('/login', (req, res) => { })

module.exports = router