const mongoose = require('mongoose')

// Creating the schema for Book model
const bookSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  author: {
    type: String,
    trim: true,
    required: true
  },
  summary: {
    type: String,
    trim: true
  }
})

// Creating a model from the schema.
const Book = mongoose.model('Book', bookSchema)
module.exports = Book