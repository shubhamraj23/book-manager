const express = require('express')
const Book = require('./bookModel')
const router = new express.Router()

// Route to add a book.
router.post('/add', async (request, response) => {
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

// Route to view the details of all the books.
router.get('/viewAll', async (request, response) => {
  try {
    // Search for all the books and return the response.
    const books = await Book.find({ })
    const updatedBooks = books.map((book) => {
      return {
        id: book._id,
        title: book.title,
        author: book.author,
        summary: book.summary
      }
    })
    response.status(200).send({ books: updatedBooks })

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
})

// Route to view the details of a single book.
router.get('/view/:id', async (request, response) => {
  try {
    // Search for the given book.
    const book = await Book.findById(request.params.id)
    if (!book) {
      return response.status(400).send({
        error: "Invalid Book Id."
      })
    }

    response.status(200).send({
      id: book._id,
      title: book.title,
      author: book.author,
      summary: book.summary
    })

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
})

// Route to update the details of a book.
router.patch('/update/:id', async (request, response) => {
  try {
    // Search for the given book.
    const book = await Book.findById(request.params.id)
    if (!book) {
      return response.status(400).send({
        error: "Invalid Book Id."
      })
    }

    // Check if the update is a valid update or not.
    const updates = Object.keys(request.body)
    const allowedUpdates = ["title", "author", "summary"]
    const validUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (!validUpdate) {
      return response.status(400).send({
        error: "Invalid updates."
      })
    }

    updates.forEach((update) => {
      book[update] = request.body[update]
    })
    await book.save()

    response.status(200).send({
      message: "Updates successful."
    })

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
})

module.exports = router