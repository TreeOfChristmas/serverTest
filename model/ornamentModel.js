const mongoose = require('mongoose');

const ornamentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageCode: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    position: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Ornament', ornamentSchema); 