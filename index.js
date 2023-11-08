// Configure the application to use environment variables
if (process.env.NODE_ENV !== 'prod'){
  require('dotenv').config()
}

// Execute the mongoose file to setup the MongoDB connection
require('./mongoose')

// Import all the relevant modules.
const express = require('express')
const cors = require('cors')
const router = require('./router')

// Create an express application.
const app = express()

// Setup the middleware.
app.use(express.json())
app.use(router)
app.use(cors({ methods: 'GET,POST,PATCH,DELETE' }))

// Setup the port for running the app.
const PORT = process.env.PORT || 8000

// Run the application.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
  console.log(process.env.NODE_ENV)
  console.log(process.env.MONGOURL)
})