// backend/routes/urlRoutes.js
const express = require('express');
const router = express.Router();
const { shortenUrl, redirectUrl, getVisitHistory } = require('../controller/url');

router.post('/shorten', shortenUrl);
router.get('/:customSlug', redirectUrl);
router.get('/history', getVisitHistory);

module.exports = router;
