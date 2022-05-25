// Assign variables
const express = require("express")

const router = express.Router()

const Restaurant = require('../../models/restaurant')

// Route for index page
router.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ id: "asc" })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.error(error))
})

// Routes for sorting
router.get("/nameAsc", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: "asc" })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.error(error))
})

router.get("/nameDesc", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: "desc" })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.error(error))
})

router.get("/categoryAsc", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ category: "asc" })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.error(error))
})

router.get("/locationAsc", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ location: "asc" })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.error(error))
})

// Route for searching a restaurant
router.get("/search", (req, res) => {
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

module.exports = router