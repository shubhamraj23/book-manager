const express = require('express')
const Book = require('./bookModel')
const router = new express.Router()

router.post('/addBook', async (request, response) => {
  try {
    // Fetch the book data from request body.
    let data = request.body
    data = {
      title: data.title,
      author: data.author,
      summary: data.summary
    }

    // Book must have a title.
    if (!data.title || data.title.trim() === "") {
      return response.status(400).send({
        error: "Title is a mandatory field."
      })
    } 

    // Book must have an author.
    if (!data.author || data.author.trim() === "") {
      return response.status(400).send({
        error: "Author is a mandatory field."
      })
    }

    // Check if the a book exists with the same title and author.
    const existingBook = await Book.findOne({ 
      title: data.title, 
      author: data.author 
    })
    if (existingBook) {
      return response.status(400).send({
        error: "This book already exists."
      })
    }

    // If everything is satisfied, add the book to the database.
    const book = new Book(data)
    await book.save()
    response.status(201).send({
      message: "Book added successfully."
    })

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
})

module.exports = router