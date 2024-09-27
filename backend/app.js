// app.js
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const couponRoutes = require('./routes/couponRoutes');
const offerRoutes = require('./routes/offerRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes')
const deliveryBoyRoutes = require('./routes/deliveryBoyRoutes')
const messageRoutes = require('./routes/messageRoutes')

require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());
// limit is necessary for file upload
app.use(express.json({
    limit: "10mb"
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// // Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/offers', offerRoutes);

app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/delivery', deliveryBoyRoutes);
app.use('/api/message', messageRoutes);

module.exports = app;

