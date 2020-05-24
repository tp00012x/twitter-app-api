const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeTimelineSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    user: {
        type: Map,
        ref: String
    }
    ,
    text: {
        type: String,
        required: true
    },
    place: {
        type: Map,
        ref: String
    },
    entities: {
        type: Map,
        ref: String
    },
    createdAt: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('HomeTimeline', HomeTimelineSchema);