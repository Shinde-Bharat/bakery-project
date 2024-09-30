// controllers/deliveryBoyController.js
const DeliveryBoy = require('../models/DeliveryBoy');
const Order = require('../models/Order');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const deliveryBoy = await DeliveryBoy.findOne({ email });
        if (!deliveryBoy) return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(password, deliveryBoy.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ deliveryBoyId: deliveryBoy._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
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

        // Update user's order history
        const user = await User.findOne({ 'orderHistory.orderId': order.orderId });
        if (user) {
            const orderIndex = user.orderHistory.findIndex(o => o.orderId === order.orderId);
            if (orderIndex !== -1) {
                user.orderHistory[orderIndex].status = 'out for delivery';
                await user.save();
            }
        }

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

        // Update user's order history
        const user = await User.findOne({ 'orderHistory.orderId': order.orderId });
        if (user) {
            const orderIndex = user.orderHistory.findIndex(o => o.orderId === order.orderId);
            if (orderIndex !== -1) {
                user.orderHistory[orderIndex].status = 'delivered';
                await user.save();
            }
        }

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Admin operations
exports.getAllDeliveryBoys = async (req, res) => {
    try {
        const deliveryBoys = await DeliveryBoy.find().select('-password');
        res.json(deliveryBoys);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDeliveryBoyById = async (req, res) => {
    try {
        const deliveryBoy = await DeliveryBoy.findById(req.params.id).select('-password');
        if (!deliveryBoy) return res.status(404).json({ message: 'Delivery boy not found' });
        res.json(deliveryBoy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateDeliveryBoy = async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body;
        const deliveryBoy = await DeliveryBoy.findByIdAndUpdate(
            req.params.id,
            { name, email, phoneNumber },
            { new: true, runValidators: true }
        ).select('-password');
        if (!deliveryBoy) return res.status(404).json({ message: 'Delivery boy not found' });
        res.json(deliveryBoy);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateDeliveryBoyPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const deliveryBoy = await DeliveryBoy.findById(req.params.id);
        if (!deliveryBoy) return res.status(404).json({ message: 'Delivery boy not found' });
        deliveryBoy.password = password;
        await deliveryBoy.save();
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteDeliveryBoy = async (req, res) => {
    try {
        const deliveryBoy = await DeliveryBoy.findByIdAndDelete(req.params.id);
        if (!deliveryBoy) return res.status(404).json({ message: 'Delivery boy not found' });
        res.json({ message: 'Delivery boy deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delivery boy profile view
exports.getOwnProfile = async (req, res) => {
    try {
        const deliveryBoy = await DeliveryBoy.findById(req.deliveryBoy._id).select('-password');
        res.json(deliveryBoy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};