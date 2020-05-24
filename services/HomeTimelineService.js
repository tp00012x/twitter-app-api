const HomeTimeline = require('../models/HomeTimeline');
const HomeTimelineClient = require('./HomeTimelineClient');

class HomeTimelineService {
    constructor(reqBody) {
        this.homeTimelineClient = new HomeTimelineClient(reqBody);
    }

    async saveHomeTimelines() {
        const filteredHomeTimelines = await this.homeTimelineClient.getFilteredHomeTimelines();

        for (const homeTimeline of filteredHomeTimelines) {
            const homeTimelineRecord = new HomeTimeline({
                id: homeTimeline.id,
                user: homeTimeline.user,
                text: homeTimeline.text,
                place: homeTimeline.place,
                entities: homeTimeline.entities,
                createdAt: new Date(homeTimeline.created_at),
            });
            try {
                await homeTimelineRecord.save()
            } catch (err) {
                console.error(err.message)
            }
        }
    }

    async getHomeTimelines() {
        try {
            return await HomeTimeline.find();
        } catch (err) {
            console.error(err.message);
        }
    }
}

module.exports = HomeTimelineService;