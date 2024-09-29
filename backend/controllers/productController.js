// controllers/productController.js
const Product = require('../models/Product');
const cloudinary = require('../fileUpload/cloudinaryConfig')


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

        // Get products from the same category
        const sameCategory = await Product.find({
            category: product.category._id,
            _id: { $ne: product._id }
        }).limit(4).populate({
            path: 'category',
            select: 'name'
        });

        // Get products from other categories
        const otherCategories = await Product.find({
            category: { $ne: product.category._id },
            _id: { $ne: product._id }
        }).limit(4).populate({
            path: 'category',
            select: 'name'
        });

        const recommendations = [...sameCategory, ...otherCategories];

        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};