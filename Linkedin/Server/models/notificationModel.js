const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    notification: {
        type: String,
        required: true,
        unique: true
    },
    _postId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _userName: {
        type: String,
        required: true
    }
})

const Notifications = mongoose.model('Notifications', NotificationSchema);

module.exports = { Notifications }