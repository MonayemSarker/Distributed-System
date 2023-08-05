const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: false
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    _userName: {
        type: String,
        required: true
    },
    _imageId: {
        type: String,
        required: false
    }

})

const Posts = mongoose.model('Posts', postSchema);

module.exports = { Posts }