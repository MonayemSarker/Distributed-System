const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Posts = mongoose.model('Posts', postSchema);

module.exports = { Posts }