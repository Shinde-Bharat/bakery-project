
const Offer = require('../models/Offer');
const cloudinary = require('../services/cloudinaryConfig')


exports.createOffer = async (req, res) => {
    try {


        let imageUrl = '';
        if (req.body.imgURL) {
            const uploadResponse = await cloudinary.uploader.upload(req.body.imgURL, {
                folder: '/bakery-imgs'
            });
            imageUrl = uploadResponse.secure_url;
        }

        const offer = new Offer({
            title: req.body.title,
            description: req.body.description,
            imgURL: imageUrl,
            type: req.body.type,
            value: req.body.value,
            expiryDate: req.body.expiryDate,
        })

        await offer.save();
        res.status(201).json(offer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find();
        res.json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOffer = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);
        if (!offer) return res.status(404).json({ message: 'Offer not found' });
        res.json(offer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!offer) return res.status(404).json({ message: 'Offer not found' });
        res.json(offer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndDelete(req.params.id);
        if (!offer) return res.status(404).json({ message: 'Offer not found' });
        res.json({ message: 'Offer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};