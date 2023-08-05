const { Posts } = require('../models/postModel');
const { Notifications } = require('../models/notificationModel');
const { Users } = require('../models/userModel');
const multer = require('multer');
const Minio = require('minio');
const asyncHandler = require("express-async-handler");

const upload = multer({
    dest: './public/images', fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    },
});





const minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: "gm0cSzJYKN4YPizWnO8o",
    secretKey: "VVn9WZ4jNHAe1JxPjgdcLhJ5NOWeXwito1q3WNMv"
});


async function uploadToMinio(file) {
    const bucketName = "linked-in";
    console.log(file);
    const objectKey = Date.now() + ' ' + file.originalname;
    const metaData = {
        'Content-Type': file.mimetype,
    }


    await minioClient.fPutObject(bucketName, objectKey, file.path, metaData, (err, etag) => {
        if (err) {
            console.log(err);
            return null;
        }
    });

    return objectKey;
}

const uploadImage = asyncHandler(async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        console.log("file: ", req.file);
        if (err) {
            return res.status(500).json({ error: 'Error uploading the image.' });
        }

        let _imageId = null;

        if (req.file) {
            _imageId = await uploadToMinio(req.file);
        }

        if (!_imageId) {
            return res.status(400).json({ error: 'No file uploaded.', url: _imageId });
        }

        return res.status(200).json({ message: 'File uploaded successfully.', url: _imageId });
    });

});


const createPost = async (req, res) => {
    console.log(req.body);
    const content = req.body.content;
    const _userEmail = req.params.userEmail;
    const imageUrl = req.body.imageUrl;

    try {
        const user = await Users.findOne({
            userEmail: _userEmail
        })
        // console.log(user)

        let newPost = await Posts.create({
            content: content,
            _userId: user.id,
            _userName: user.userName,
            _imageId: imageUrl
        })
        // console.log(newPost);
        console.log(user);
        let notification = await Notifications.create({
            notification: user.userName + " created a new post",
            _postId: newPost._id,
            _userName: user.userName
        })
        console.log(notification);
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

const getOnePost = async (req, res) => {
    const _postId = req.params.postId;
    console.log(_postId);
    try {
        const post = await Posts.findOne({
            _id: _postId
        });
        console.log(post);
        res.json(post);
    } catch (error) {
        res.json(error);
    }
}
module.exports = {
    createPost,
    getPosts,
    uploadImage,
    minioClient,
    getOnePost,
}