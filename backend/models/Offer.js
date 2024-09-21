
const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imgURL: { type: String, required: true },
    type: { type: String, enum: ['percentage', 'flat'], required: true },
    value: { type: Number, required: true },
    expiryDate: { type: Date, required: true }
});

module.exports = mongoose.model('Offer', offerSchema);