const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true },
    avlQuantity: { type: Number, required: true },
    reviews: [{
        text: String,
        rating: { type: Number, min: 0, max: 5 }
    }]
});

module.exports = mongoose.model('Product', productSchema);




