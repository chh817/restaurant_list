// Assign variables
const express = require("express")
const { db } = require("../../models/restaurant")

const router = express.Router()

const Restaurant = require('../../models/restaurant')

// Route for index page
router.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: "asc" })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.error(error))
})

// Route for searching a restaurant
router.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find().or([
    { name: { $regex: keyword, $options: "$i" } }, { name_en: { $regex: keyword, $options: "$i" } }, { category: { $regex: keyword, $options: "$i" } }
  ])
    .lean()
    .then(restaurants => {
      res.render("index", { restaurants, keyword })
    })
    .catch(err => console.log(err))
})

// Route for sorting
router.post("/sort", (req, res) => {
  const option = req.body.select
  Restaurant.find()
    .lean()
    .sort(option)
    .then(restaurants => res.render("index", { restaurants }))
})

module.exports = router
