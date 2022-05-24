const mongoose = require("mongoose")
const Restaurant = require("../restaurant") // Require the Restaurant model
const restaurantList = require("../../restaurant.json") // Require the JSON file
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on("error", () => {
  console.log("connection error!")
})
db.once("open", () => {
  console.log("Mongodb connected!")
  Restaurant.create(restaurantList.results)
    .then(() => console.log("done!"))
})