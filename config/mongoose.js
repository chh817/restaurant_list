// Assign Variables
const mongoose = require("mongoose")

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on("error", () => {
  console.log("connection error!")
})
db.once("open", () => {
  console.log("Mongodb connected!")
})

module.exports = db