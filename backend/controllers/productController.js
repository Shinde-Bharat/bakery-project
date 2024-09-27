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
        const product = await Product.findById(req.params.id).populate('category');
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


