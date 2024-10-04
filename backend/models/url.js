// backend/models/Url.js
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    customSlug: { type: String, required: true, unique: true },
    visitCount: { type: Number, default: 0 },
    visitHistory: { type: [Date], default: [] },
  });

module.exports = mongoose.model('Url', urlSchema);
