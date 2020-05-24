const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    screenName: {
        type: String,
        required: true
    },
    profile_image_url: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('User', UserSchema);