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
const orderController = require('./controllers/orderController')
const crypto = require('crypto');

const axios = require('axios');

require('dotenv').config();
const cors = require('cors');
const Order = require('./models/Order');
const auth = require('./middleware/auth');

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

// payment login

const MERCHANT_KEY = "96434309-7796-489d-8924-ab56988a6076"
const MERCHANT_ID = "PGTESTPAYUAT86"


const MERCHANT_BASE_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
const MERCHANT_STATUS_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status"

const redirectUrl = `${process.env.BACKEND_URL}/payment-status`

const successUrl = `${process.env.CLIENT_URL}/confirmedOrdered`
const failureUrl = `${process.env.CLIENT_URL}/payment-failure`

app.post('/create-order', auth, async (req, res) => {
    const { orderId, name, mobileNumber, amount, customer, shippingAddress, postalCode, date, items, total } = req.body;

    this.orderId = orderId;
    this.name = name;
    this.mobileNumber = mobileNumber;
    this.amount = amount;
    this.customer = customer;
    this.shippingAddress = shippingAddress;
    this.postalCode = postalCode;
    this.date = date;
    this.items = items;
    this.total = total;
    this.user = req.user


    const paymentPayload = {
        merchantId: MERCHANT_ID,
        merchantUserId: name,
        mobileNumber: mobileNumber,
        amount: amount * 100,
        merchantTransactionId: orderId,
        redirectUrl: `${redirectUrl}/?id=${orderId}`,
        redirectMode: 'POST',
        paymentInstrument: {
            type: 'PAY_PAGE'
        },

    }
    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64')
    const keyIndex = 1
    const string = payload + '/pg/v1/pay' + MERCHANT_KEY
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256 + '###' + keyIndex

    const option = {
        method: 'POST',
        url: MERCHANT_BASE_URL,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum
        },
        data: {
            request: payload
        }
    }
    try {
        const response = await axios.request(option);
        // console.log(response);

        const phonePeTransactionId = response.data.transactionId;
        res.status(200).json({
            msg: "payment done",
            status: "success",
            data: response.data,
            url: response.data.data.instrumentResponse.redirectInfo.url,
            phonePeTransactionId: phonePeTransactionId,
        })

    } catch (error) {
        console.log("error in payment", error)
        res.status(500).json({ msg: "Payment Failed", status: "error", error: error.message });
    }
});

app.post('/payment-status', async (req, res) => {
    const merchantTransactionId = req.query.id;

    const keyIndex = 1
    const string = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256 + '###' + keyIndex

    const option = {
        method: 'GET',
        url: `${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': MERCHANT_ID
        },
    }

    try {
        const response = await axios.request(option);
        if (response.data.success === true) {
            // Payment successful, send success response to frontend

            req.body = {
                orderId: this.orderId,
                name: this.name,
                mobileNumber: this.mobileNumber,
                amount: this.amount,
                customer: this.customer,
                shippingAddress: this.shippingAddress,
                postalCode: this.postalCode,
                date: this.date,
                items: this.items,
                total: this.total

            };
            req.user = this.user;

            await orderController.createOrder(req, res);

            // Redirect to the success URL
            return res.redirect(`${successUrl}/${this.orderId}`);

        } else {
            // Payment failed, send failure response to frontend
            // res.status(400).json({ success: false, orderId: merchantTransactionId });

            return res.redirect(failureUrl);
        }
    } catch (error) {
        console.error("Error checking payment status:", error);
        res.status(500).json({ error: 'Failed to check payment status' });
    }
});


module.exports = app;

