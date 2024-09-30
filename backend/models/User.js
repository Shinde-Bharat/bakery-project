// models/User.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    addressName: String,
    streetName: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
});

const orderItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    subtotal: Number
});

const orderHistorySchema = new mongoose.Schema({
    orderId: String,
    placedOn: Date,
    total: Number,
    status: String,
    items: [orderItemSchema]
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: String,
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'delivery'], default: 'user' },
    savedAddresses: [addressSchema],
    orderHistory: [orderHistorySchema],
    wishlistItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    cartItems: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }]
});

module.exports = mongoose.model('User', userSchema);