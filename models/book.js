const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },
 
  image: {
    type: String,
    required: true,
    trim: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;