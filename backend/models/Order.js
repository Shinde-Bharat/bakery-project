const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
});

const orderItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    category: { categorySchema },
});

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    customer: {
        name: String,
        number: String
    },
    shippingAddress: { type: String, required: true },
    postalCode: { type: String, required: true },
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