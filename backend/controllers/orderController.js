
// controllers/orderController.js
const Order = require('../models/Order');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();

        // Add to user's order history
        const user = await User.findById(req.user.userId);
        user.orderHistory.push({
            orderId: order.orderId,
            placedOn: order.date,
            total: order.total,
            orderStatus: order.status,
            items: order.items
        });
        await user.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Update user's order history
        const user = await User.findOne({ 'orderHistory.orderId': order.orderId });
        if (user) {
            const orderIndex = user.orderHistory.findIndex(o => o.orderId === order.orderId);
            if (orderIndex !== -1) {
                user.orderHistory[orderIndex].orderStatus = status;
                await user.save();
            }
        }

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.assignDeliveryBoy = async (req, res) => {
    try {
        const { deliveryBoyId } = req.body;
        const deliveryBoy = await User.findById(deliveryBoyId);
        if (!deliveryBoy || deliveryBoy.role !== 'delivery') {
            return res.status(400).json({ message: 'Invalid delivery boy' });
        }

        const order = await Order.findByIdAndUpdate(req.params.id, {
            deliveryBoy: {
                id: deliveryBoy._id,
                name: deliveryBoy.name
            }
        }, { new: true });

        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};