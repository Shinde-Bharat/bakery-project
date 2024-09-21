const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    type: { type: String, enum: ['percentage', 'flat'], required: true },
    value: { type: Number, required: true },
    expiryDate: { type: Date, required: true }
});

module.exports = mongoose.model('Coupon', couponSchema);