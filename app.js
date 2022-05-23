// Requiring and executing the Express framework
const express = require("express")
const app = express()

// Assign the server-related variables
const port = 3000

// Requiring the Express-Handlebars package
const { engine } = require("express-handlebars")

// Setting up the template engine Handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

// Requiring the Mongoose package
const mongoose = require('mongoose')

// Setting up the connection to the MongoDB Atlas database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Checking the connection status
const db = mongoose.connection

// Connection failed
db.on('error', () => {
  console.log('mongodb error!')
})

// Connection successful
db.once('open', () => {
  console.log('mongodb connected!')
})

// Locating the static files
app.use(express.static("public"))

// Requiring the Restaurant model
const Restaurant = require('./models/restaurant')

// Setting the static route for the index page
app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// Setting the dynamic route for the show page
app.get("/restaurants/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(error => console.log(error))
})

// Setting the search route for the index page
app.get("/search", (req, res) => {
  if (!req.query.keyword) {
    res.redirect("/")
  }
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.results.filter(restaurant =>
    restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
  )
  console.log(restaurants)
  res.render("index", { restaurants, keyword })
})

// Setting the message for activating the server
app.listen(port, () => {
  console.log(`The server http://localhost:${port} is activated!`)
})
