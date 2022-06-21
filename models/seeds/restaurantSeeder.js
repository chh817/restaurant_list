// Assign variables
const bcrypt = require('bcryptjs')

if (process.env.NOD_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')

const Restaurant = require("../restaurant")

const restaurantList = require("../../restaurant.json").results

const db = require("../../config/mongoose")

const seedUsers = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    ownedRestaurants: restaurantList.slice(0, 3)
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    ownedRestaurants: restaurantList.slice(3, 6)
  }
]

// Successful connection to MongoDB Atlas
db.once("open", () => {
  return Promise.all(Array.from(seedUsers, seedUser => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        const ownedRestaurants = seedUser.ownedRestaurants
        return Promise.all(Array.from(ownedRestaurants, ownedRestaurant => {
          return Restaurant.create({
            name: ownedRestaurant.name,
            name_en: ownedRestaurant.name_en,
            category: ownedRestaurant.category,
            image: ownedRestaurant.image,
            location: ownedRestaurant.location,
            phone: ownedRestaurant.phone,
            google_map: ownedRestaurant.google_map,
            rating: ownedRestaurant.rating,
            description: ownedRestaurant.description,
            userId: userId
          })
        }))
      })
  }))
    .then(() => {
      console.log('Done!')
      process.exit()
    })
})