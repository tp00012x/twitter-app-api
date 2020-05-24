const Twit = require('twit');

class HomeTimelineClient {
    constructor(req_body) {
        this.twitClient = this.buildTwitClient(req_body);
    }

    buildTwitClient({twitterToken, twitterSecret}) {
        return new Twit({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token: twitterToken,
            access_token_secret: twitterSecret,
            timeout_ms: 60 * 1000,
            strictSSL: true,
        });
    }

    async getAllHomeTimelines() {
        try {
            const response = await this.twitClient.get(
                'statuses/home_timeline',
                {exclude_replies: true}
            )
            return response.data;
        } catch (error) {
            console.error(error.message);
            return [];
        }
    }

    async getFilteredHomeTimelines() {
        const sevenDaysAgo = 7;
        const filterDate = new Date(Date.now() - sevenDaysAgo * 24 * 60 * 60 * 1000);
        const allHomeStatuses = await this.getAllHomeTimelines();

        return allHomeStatuses.filter(({created_at, entities}) => {
            return new Date(created_at) > filterDate && entities.urls.length >= 1;
        })
    }
}

module.exports = HomeTimelineClient;