// controllers/deliveryBoyController.js
const DeliveryBoy = require('../models/DeliveryBoy');
const Order = require('../models/Order');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const deliveryBoy = await DeliveryBoy.findOne({ email });
        if (!deliveryBoy) return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(password, deliveryBoy.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ deliveryBoyId: deliveryBoy._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPackedOrders = async (req, res) => {
    try {
        const packedOrders = await Order.find({ status: 'packed' });
        res.json(packedOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.acceptOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        if (order.status !== 'packed') return res.status(400).json({ message: 'Order is not ready for delivery' });

        order.status = 'out for delivery';
        order.deliveryBoy = {
            id: req.deliveryBoy._id,
            name: req.deliveryBoy.name
        };
        await order.save();

        req.deliveryBoy.acceptedOrders.push(order._id);
        await req.deliveryBoy.save();

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAcceptedOrders = async (req, res) => {
    try {
        const deliveryBoy = await DeliveryBoy.findById(req.deliveryBoy._id).populate('acceptedOrders');
        res.json(deliveryBoy.acceptedOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        if (order.deliveryBoy.id.toString() !== req.deliveryBoy._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this order' });
        }
        if (order.status !== 'out for delivery') {
            return res.status(400).json({ message: 'Order is not out for delivery' });
        }

        order.status = 'delivered';
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};