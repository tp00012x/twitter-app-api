const express = require('express');
const router = express.Router();
const HomeTimelineService = require('../services/HomeTimelineService');

router.post('/home_timeline', async (req, res) => {
    // Save HomeTimelines
    const twitterService = new HomeTimelineService(req.body);
    const savedHomeTimelines = await twitterService.saveHomeTimelines();

    return res.json(savedHomeTimelines);
})

module.exports = router;