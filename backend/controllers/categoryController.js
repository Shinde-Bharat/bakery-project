const Category = require('../models/Category');
const cloudinary = require('../services/cloudinaryConfig')



exports.createCategory = async (req, res) => {
    try {
        let imageUrl = '';
        if (req.body.image) {
            const uploadResponse = await cloudinary.uploader.upload(req.body.image, {
                folder: '/bakery-imgs'
            });
            imageUrl = uploadResponse.secure_url;
        }

        const category = new Category({
            name: req.body.name,
            imgURL: imageUrl
        });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
