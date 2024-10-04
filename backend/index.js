// backend/index.js (or server.js)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const urlRoutes = require('./routes/url');
const youtubeRoutes=require("./routes/youtube")  // New YouTube route
require('dotenv').config();
const urlController = require("./controller/url");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Existing URL shortener routes
app.use('/api/urls', urlRoutes);
app.get('/:customSlug', urlController.redirectUrl);

// New YouTube downloader route
app.use('/api/youtube', youtubeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
