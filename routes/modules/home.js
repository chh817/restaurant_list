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
    .then(restaurants => res.render("index", { restaurants, option: "排序方式選擇" }))
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
  const option = Number(req.body.select)
  const sortRule = [
    { name_en: "1" }, { name_en: "-1" }, { category: "1" }, { location: "1" }
  ]
  const sortOption = sortRule[option]

  Restaurant.find()
    .lean()
    .sort(sortOption)
    .then(restaurants => res.render("index", { restaurants }))
})

module.exports = router