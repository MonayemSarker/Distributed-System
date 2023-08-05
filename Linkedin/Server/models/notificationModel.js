const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    notification: {
        type: String,
        required: true,
        unique: false
    },
    _postId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _userName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const Notifications = mongoose.model('Notifications', NotificationSchema);

module.exports = { Notifications }