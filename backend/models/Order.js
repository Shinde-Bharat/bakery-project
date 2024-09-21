const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    productName: String,
    price: Number,
    quantity: Number,
    subtotal: Number
});

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    customer: {
        name: String,
        number: String
    },
    date: { type: Date, default: Date.now },
    total: Number,
    status: {
        type: String,
        enum: ['processing', 'packed', 'out for delivery', 'delivered'],
        default: 'processing'
    },
    deliveryBoy: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryBoy' },
        name: String
    },
    items: [orderItemSchema]
});

module.exports = mongoose.model('Order', orderSchema);