// Assign variables
const express = require("express")

const router = express.Router()

const User = require('../../models/user')

const passport = require('passport')


// Routes for login page
router.get('/login', (req, res) => { res.render('login') })
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }))

// Routes for register page
router.get('/register', (req, res) => { res.render('register') })

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user)
        return res.render('register', { name, email, password, confirmPassword })
      User.create({ name, email, password })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => (console.log(err)))
})


module.exports = router