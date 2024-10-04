// backend/routes/youtube.js

const express = require('express');
const { downloadVideo } = require("../controller/youtubeDownloader")

const router = express.Router();

// Route to download YouTube video
router.get('/download', downloadVideo);

module.exports = router;
