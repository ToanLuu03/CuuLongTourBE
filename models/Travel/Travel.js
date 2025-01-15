// Import Mongoose
const mongoose = require('mongoose');

// Define the Travel schema
const TravelSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true,
  },
  img: {
    type: String, 
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  facebook: {
    type: String,
    trim: true,
  },
  instagram: {
    type: String, 
    trim: true,
  },
  reviews: [
    {
      user: {
        type: String, 
        required: true,
      },
      comment: {
        type: String,
        required: true,
        trim: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, {
  timestamps: true,
});

const Travel = mongoose.model('Travel', TravelSchema);

module.exports = Travel;
