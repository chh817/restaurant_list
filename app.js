// Assign variables
const express = require("express")
const { engine } = require("express-handlebars")
const bodyParser = require("body-parser")
const app = express()
const port = 3000
const Restaurant = require("./models/restaurant")
const mongoose = require("mongoose")

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on("error", () => {
  console.log("connection error!")
})
db.once("open", () => {
  console.log("Mongodb connected!")
})

// Set up Handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

// Use static files
app.use(express.static("public"))

// Use body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// Route for index page
app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.error(error))
})

// Route for searching a restaurant
app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const restaurantsFiltered = restaurants.filter(
        restaurant =>
          restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
      )
      res.render("index", { restaurants: restaurantsFiltered, keyword })
    })
    .catch(err => console.log(err))
})

// Route for clicking create button
app.get("/restaurants/new", (req, res) => {
  return res.render("new")
})

// Route for creating a new restaurant
app.post("/restaurants", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// Route for show page
app.get("/restaurants/:restaurantId", (req, res) => {
  const id = req.params.restaurantId
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(error => console.log(error))
})

// Route for edit page
app.get("/restaurants/:restaurantId/edit", (req, res) => {
  const id = req.params.restaurantId
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(error => console.log(error))
})

// Route for editing the restaurant info 
app.post("/restaurants/:restaurantId/edit", (req, res) => {
  const id = req.params.restaurantId
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

// Route for deleting the restaurant info
app.post("/restaurants/:restaurantId/delete", (req, res) => {
  const id = req.params.restaurantId
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

// Start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})