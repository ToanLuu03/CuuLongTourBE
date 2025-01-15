const mongoose = require('mongoose');

// Schema cho Hotel
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hotel name is required'],
    trim: true,
    maxlength: [100, 'Hotel name cannot exceed 100 characters'],
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String },
  },
  pricePerNight: {
    type: Number,
    required: true,
    min: [0, 'Price per night cannot be negative'],
  },
  amenities: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  images: {
    type: [String],
    default: [],
  },
  reviews: [
    {
      user: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
      },
      comment: {
        type: String,
        required: [true, 'Review comment is required'],
        maxlength: [500, 'Comment cannot exceed 500 characters'],
      },
      rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5'],
      },
      date: {
        type: Date,
        default: Date.now,
      },
    }
  ],
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /\+?\d{10,13}/.test(v); // Định dạng số điện thoại hợp lệ
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  facebookLink: {
    type: String,
    match: [/^(https:\/\/www\.facebook\.com\/[a-zA-Z0-9_.-]+)$/, 'Please enter a valid Facebook link'],
  },
  instagramLink: {
    type: String,
    match: [/^(https:\/\/www\.instagram\.com\/[a-zA-Z0-9_.-]+)$/, 'Please enter a valid Instagram link'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
