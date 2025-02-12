// Import Mongoose
const mongoose = require('mongoose');

// Define the Tour schema
const TourSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
      trim: true,
    },
    tour: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
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
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model('Tour', TourSchema);

module.exports = Tour;
