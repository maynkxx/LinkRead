const express = require('express');
const router = express.Router();
const { generateTitles, improveText, generateTags } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.post('/generate-titles', protect, generateTitles);
router.post('/improve-text', protect, improveText);
router.post('/suggest-tags', protect, generateTags);

module.exports = router;
