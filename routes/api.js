const express = require('express');
const router = express.Router();
const HomeTimelineService = require('../services/HomeTimelineService');

router.post('/home_timeline', async (req, res) => {
    // Save HomeTimelines
    const twitterService = new HomeTimelineService(req.body);
    await twitterService.saveHomeTimelines();

    // Get HomeTimelines
    const homeStatuses = await twitterService.getHomeTimelines();
    return res.json(homeStatuses);
})

module.exports = router;