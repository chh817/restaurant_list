// Assign variables
const express = require("express")

const router = express.Router()

const Restaurant = require("../../models/restaurant")

// Route for clicking create button
router.get("/new", (req, res) => {
  return res.render("new")
})

// Route for creating a new restaurant
router.post("/", (req, res) => {
  req.body.userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description, userId } = req.body
  Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// Route for show page
router.get("/:restaurantId", (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(error => console.log(error))
})

// Route for edit page
router.get("/:restaurantId/edit", (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(error => console.log(error))
})

// Route for editing the restaurant info 
router.put("/:restaurantId", (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  Restaurant.findOneAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

// Route for deleting the restaurant info
router.delete("/:restaurantId", (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  Restaurant.findOneAndDelete({ _id, userId })
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

module.exports = router