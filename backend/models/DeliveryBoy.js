// models/DeliveryBoy.js
const mongoose = require('mongoose');

const deliveryBoySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    acceptedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

module.exports = mongoose.model('DeliveryBoy', deliveryBoySchema);

