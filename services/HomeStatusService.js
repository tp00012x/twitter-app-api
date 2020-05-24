const HomeStatus = require('../models/HomeStatus');
const HomeStatusClient = require('../homeStatusClient');

class TwitterService {
    constructor(reqBody) {
        this.homeStatusClient = new HomeStatusClient(reqBody);
    }

    async saveHomeStatuses() {
        const filteredHomeStatuses = await this.homeStatusClient.getFilteredHomeStatuses();

        filteredHomeStatuses.forEach((homeStatus) => {
            const homeStatusRecord = new HomeStatus({
                id: homeStatus.id,
                user: homeStatus.user,
                text: homeStatus.text,
                place: homeStatus.place,
                entities: homeStatus.entities,
                createdAt: new Date(homeStatus.created_at),
            });
            try {
                homeStatusRecord.save()
            } catch (err) {
                console.error(err.message)
            }
        })
    }

    async getHomeStatuses() {
        try {
            return await HomeStatus.find()
        } catch (err) {
            console.error(err.message)
        }
    }
}

module.exports = TwitterService;