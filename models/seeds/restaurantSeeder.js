const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // Requiring the Restaurant model
const restaurantList = require("../../restaurant.json") // Requiring the JSON file
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(restaurantList.results)
    .then(() => console.log("done!"))
})