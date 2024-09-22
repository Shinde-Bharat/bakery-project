const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const updateData = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            updateData,
            { new: true }
        )
            .select('-password')
            .populate('wishlistItems')
            .populate('cartItems.product');

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        user.savedAddresses.push(req.body);
        await user.save();
        res.json(user.savedAddresses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        user.savedAddresses.id(req.params.addressId).remove();
        await user.save();
        res.json(user.savedAddresses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getOrderHistory = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.json(user.orderHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.changeUserRole = async (req, res) => {
    try {
        const { userId, role } = req.body;
        const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).select('-password');
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addNewUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const password = Math.random().toString(36).slice(-8); // Generate a random password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, role, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User added successfully', password });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.listUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createDeliveryBoy = async (req, res) => {
    try {
        const { name, email, phoneNumber, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const deliveryBoy = new DeliveryBoy({ name, email, phoneNumber, password: hashedPassword });
        await deliveryBoy.save();
        res.status(201).json({ message: 'Delivery boy created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};