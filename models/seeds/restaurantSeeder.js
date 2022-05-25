// Assign variables
const Restaurant = require("../restaurant")

const restaurantList = require("../../restaurant.json")

const db = require("../../config/mongoose")

// Successful connection to MongoDB Atlas
db.once("open", () => {
  console.log("Mongodb connected!")
  Restaurant.create(restaurantList.results)
    .then(() => console.log("done!"))
})