const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const urlRoutes = require('./routes/url'); 
const youtubeRoutes = require('./routes/youtube');
require('dotenv').config();
const urlController = require('./controller/url');

const app = express();
const port = process.env.PORT || 5000;

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// URL Shortener API Routes
app.use('/api/urls', urlRoutes);

// Custom Slug Redirect Route
// This should come after defining other routes to handle specific custom slugs for redirection.
app.get('/:customSlug', urlController.redirectUrl);

// YouTube downloader route
app.use('/api/youtube', youtubeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
