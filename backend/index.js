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

/*
app.use(cors({
  origin: 'http://localhost:3000', // Ensure this matches your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
}));
*/

app.use((req, res, next) => {
  res.setTimeout(300000); // 5 minutes
  next();
});

app.use(cors({
  origin: 'https://url-shortener-frontend-tvo9.onrender.com', // Replace with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Existing URL shortener routes (if present)
app.use('/api/urls', urlRoutes);
app.get('/:customSlug', urlController.redirectUrl);

// YouTube downloader route
app.use('/api/youtube', youtubeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});