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
  Promise.all(Array.from(seedUsers, seedUser => {
    bcrypt
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
        Promise.all(Array.from(ownedRestaurants, ownedRestaurant => {
          ownedRestaurant.userId = userId
          Restaurant.create(ownedRestaurant)
        }))
      })
  }))
    .then(() => {
      console.log('Done!')
      // process.exit()
    })
})