const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Link = new Schema({
    twitterId: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('links', Link);