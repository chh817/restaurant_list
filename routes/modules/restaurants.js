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
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// Route for show page
router.get("/:restaurantId", (req, res) => {
  const id = req.params.restaurantId
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(error => console.log(error))
})

// Route for edit page
router.get("/:restaurantId/edit", (req, res) => {
  const id = req.params.restaurantId
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(error => console.log(error))
})

// Route for editing the restaurant info 
router.put("/:restaurantId", (req, res) => {
  const id = req.params.restaurantId
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

// Route for deleting the restaurant info
router.delete("/:restaurantId", (req, res) => {
  const id = req.params.restaurantId
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

module.exports = router