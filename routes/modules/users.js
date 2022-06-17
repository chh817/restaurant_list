// Assign variables
const express = require("express")

const router = express.Router()

const User = require('../../models/user')

const passport = require('passport')


// Route for login page
router.get('/login', (req, res) => { res.render('login') })

// Route for user login
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }))

// Route for register page
router.get('/register', (req, res) => { res.render('register') })

// Route for user register
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

// Route for user logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router