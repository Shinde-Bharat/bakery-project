// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true },
    avlQuantity: { type: Number, required: true },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        rating: { type: Number, min: 0, max: 5 }
    }],
    averageRating: { type: Number, default: 0, min: 0, max: 5 }
});

productSchema.methods.calculateAverageRating = function () {
    if (this.reviews.length === 0) {
        this.averageRating = 0;
    } else {
        const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
        this.averageRating = sum / this.reviews.length;
    }
    return this.averageRating;
};

module.exports = mongoose.model('Product', productSchema);