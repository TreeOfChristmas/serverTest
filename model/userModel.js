const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    kakaoId: {
        type: String,
        required: true,
        unique: true
    },
    profileName: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema); 