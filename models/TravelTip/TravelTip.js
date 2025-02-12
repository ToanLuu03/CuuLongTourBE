// TravelTip.js
const mongoose = require('mongoose');

// Định nghĩa schema cho TravelTip
const travelTipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: [{
        type: String,
        required: false,
    }],
    description: {
        type: String,
        required: true,
        trim: true
    },
    content: [{
        type: {
            type: String,
            enum: ['text', 'image', 'video', 'mixed'],
            required: true
        },
        data: {
            type: String, // Dữ liệu chính (ví dụ: văn bản, URL hình ảnh, URL video)
            required: function () {
                return this.type !== 'mixed';
            }
        },  
        caption: {
            type: String, // Chú thích (nếu có)
            trim: true
        },
        // Các trường dành riêng cho loại 'mixed'
        text: {
            type: String, // Văn bản
            trim: true
        },
        image: [{
            type: String, // URL hình ảnh
            trim: true
        }],
        video: {
            type: String, // URL video
            trim: true
        },
        default: []
    }],
    location: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['Adventure', 'Food', 'Culture', 'Nature', 'Other'],
        default: 'Other'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Tạo model từ schema
const TravelTip = mongoose.model('TravelTip', travelTipSchema);

module.exports = TravelTip;