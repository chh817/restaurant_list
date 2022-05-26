// Assign variables
const express = require("express")
const { engine } = require("express-handlebars")
const bodyParser = require("body-parser")
const app = express()
const port = 3000
const methodOverride = require("method-override")
const routes = require("./routes")

// Requiring mongoose
require("./config/mongoose")

// Set up Handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

// Use static files
app.use(express.static("public"))

// Use body-parser
app.use(bodyParser.urlencoded({ extended: true }))


// Use method-override
app.use(methodOverride("_method"))

// Guiding request into route
app.use(routes)

// Start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})