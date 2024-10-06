const express = require('express');
const router = express.Router();
const { getVideoInfo, downloadVideo } = require('../controller/youtubeDownloader');

router.get('/info', getVideoInfo);
router.get('/download', downloadVideo);

module.exports = router;