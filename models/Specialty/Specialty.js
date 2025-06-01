const mongoose = require('mongoose');

const specialtySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{ type: String }],
    origin: { type: String, required: true },
    weight: { type: String },
    ingredients: { type: [String] },
    expirationDate: { type: Date },
    certification: {
        name: { type: String },
        image: { type: String }
    },
    packaging: { type: String },
    // Thêm phần liên hệ
    contact: {
        phone: { type: String },  // Số điện thoại liên hệ
        email: { type: String },  // Email liên hệ
        address: { type: String } // Địa chỉ liên hệ
    },
     qrUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Specialty', specialtySchema);
