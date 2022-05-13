// Requiring and executing the Express framework
const express = require("express")
const app = express()

// Assign the server-related variables
const port = 3000

// Requiring the Express-Handlebars package
const { engine } = require("express-handlebars")

// Setting the template engine Handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

// Requiring the JSON file
const restaurantList = require("./restaurant.json")

// Locating the static files
app.use(express.static("public"))


// Setting the static route for the index page
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results })
})

// Setting the dynamic route for the show page
app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render("show", { restaurant: restaurant })
})

// Setting the search route for the index page
app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.results.filter(restaurant =>
    restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
  )
  console.log(restaurants)
  res.render("index", { restaurants: restaurants, keyword: keyword })
})

// Setting the message for activating the server
app.listen(port, () => {
  console.log(`The server http://localhost:${port} is activated!`)
})
