const { Posts } = require('../models/postModel');
const { Notifications } = require('../models/notificationModel');
const { Users } = require('../models/userModel');

const createPost = async (req, res) => {
    const content = req.body.content;
    const _userId = req.params.id;

    try {
        const user = await Users.findOne({
            _id: _userId
        })
        console.log(user)

        let newPost = await Posts.create({
            content: content,
            _userId: _userId
        })
        await Notifications.create({
            notification: user.userName + " created a new post",
            _postId: newPost._id
        })
        res.json({ message: "Post created successfully" });
    } catch (error) {
        res.json(error)
    }
}

const getPosts = async (req, res) => {
    try {
        const allPosts = await Posts.find();
        res.json(allPosts);
    } catch (error) {
        res.json(error);
    }
};
module.exports = {
    createPost,
    getPosts
}