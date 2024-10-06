const Url = require('../models/url');
const crypto = require('crypto');
const QRCode = require('qrcode');

// Shorten URL
exports.shortenUrl = async (req, res) => {
    const { originalUrl, customSlug } = req.body;
    const baseUrl = process.env.BASE_URL || 'https://mini-url'; // Use the custom domain
    const shortUrl = `${baseUrl}/${customSlug}`;
  
    try {
        let url = await Url.findOne({ customSlug });
        if (url) {
            return res.status(400).json({ message: 'Custom URL already exists. Please try a different one.' });
        }
  
        url = new Url({
            originalUrl,
            shortUrl,
            customSlug,
        });
  
        await url.save();
        res.status(201).json({ shortUrl, qrCode: await QRCode.toDataURL(shortUrl) });
    } catch (error) {
        res.status(500).json({ message: 'Failed to shorten URL', error: error.message });
    }
};

// Redirect and track visit
exports.redirectUrl = async (req, res) => {
    const { customSlug } = req.params;
    
    try {
        const url = await Url.findOne({ customSlug });
        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }
  
        // Increment visit count and update history
        url.visitCount += 1;
        url.visitHistory.push(new Date());
        await url.save();
  
        // Redirect to the original URL
        res.redirect(url.originalUrl);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch visit history
exports.getVisitHistory = async (req, res) => {
    try {
        const urls = await Url.find({}, 'shortUrl visitCount visitHistory');
        res.json(urls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
