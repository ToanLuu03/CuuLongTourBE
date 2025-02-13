const mongoose = require('mongoose');

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
        caption: {
            type: String,
            trim: true
        },
        textTitle: {
            type: String,
            trim: true,
            required: function () {
                return this.type === 'text' || this.type === 'mixed';
            }
        },
        text: {
            type: [String],
            trim: true
        },
        image: [{
            type: String,
            trim: true
        }],
        video: {
            type: String,
            trim: true
        },
    }],
    location: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
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

const TravelTip = mongoose.model('TravelTip', travelTipSchema);

module.exports = TravelTip;
