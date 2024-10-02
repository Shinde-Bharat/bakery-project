// controllers/productController.js
const Product = require('../models/Product');
const cloudinary = require('../services/cloudinaryConfig')
const Category = require('../models/Category');
const mongoose = require('mongoose');


exports.createProduct = async (req, res) => {
    try {
        let imageUrl = '';
        if (req.body.image) {
            const uploadResponse = await cloudinary.uploader.upload(req.body.image, {
                folder: '/bakery-imgs'
            });
            imageUrl = uploadResponse.secure_url;
        }

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            avlQuantity: req.body.avlQuantity,
            imageURL: imageUrl
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category').populate({
            path: 'reviews.user', // Populating user details in reviews
            select: 'name'        // Only selecting the name field from User
        });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.addReview = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        console.log(req.user);


        const newReview = {
            user: req.user.userId,
            text: req.body.text,
            rating: req.body.rating
        };

        product.reviews.push(newReview);
        product.averageRating = product.calculateAverageRating();
        await product.save();

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getRecommendations = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Get 2 products from the same category
        const sameCategory = await Product.find({
            category: product.category._id,
            _id: { $ne: product._id }
        }).limit(2).populate({
            path: 'category',
            select: 'name imgURL'
        });

        // Get all other categories
        const otherCategories = await Category.find({ _id: { $ne: product.category._id } });

        let otherCategoryProducts = [];

        // Get one random product from each other category
        for (const category of otherCategories) {
            const randomProduct = await Product.findOne({
                category: category._id,
                _id: { $ne: product._id }
            }).populate({
                path: 'category',
                select: 'name imgURL'
            });

            if (randomProduct) {
                otherCategoryProducts.push(randomProduct);
            }

            // Break the loop if we have 6 products from other categories
            if (otherCategoryProducts.length === 6) break;
        }

        // If we have less than 6 products from other categories, add more random products
        if (otherCategoryProducts.length < 6) {
            const remainingCount = 6 - otherCategoryProducts.length;
            const additionalProducts = await Product.aggregate([
                {
                    $match: {
                        _id: {
                            $ne: new mongoose.Types.ObjectId(product._id),
                            $nin: otherCategoryProducts.map(p => p._id)
                        },
                        category: { $ne: product.category._id }
                    }
                },
                { $sample: { size: remainingCount } },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                { $unwind: '$category' },
                {
                    $project: {
                        'category.name': 1,
                        'category.imgURL': 1,
                        name: 1,
                        description: 1,
                        price: 1,
                        imageURL: 1,
                        averageRating: 1,
                        avlQuantity: 1
                    }
                }
            ]);

            otherCategoryProducts = [...otherCategoryProducts, ...additionalProducts];
        }

        // Combine recommendations and remove duplicates
        const allRecommendations = [...sameCategory, ...otherCategoryProducts];
        const uniqueRecommendations = allRecommendations.filter((product, index, self) =>
            index === self.findIndex((t) => t._id.toString() === product._id.toString())
        );

        // Limit to 8 recommendations
        const finalRecommendations = uniqueRecommendations.slice(0, 8);

        res.json(finalRecommendations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};