const { Posts } = require('../models/postModel');
const { Notifications } = require('../models/notificationModel');
const { Users } = require('../models/userModel');
const Minio = require('minio');




const minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: 'QC8JQKgbjf5pbDWNa8fE',
    secretKey: 'Z8CLGHoc7oVowZqNdwHe1w9uvtj5MqFnsMCoME4I'
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
    }); //bucketName, objectKey

    return objectKey;
}


const getImageFromMinio = (imageId) => {
    return new Promise((resolve, reject) => {
        minioClient.getObject('linked-in', imageId, (err, dataStream) => {
            if (err) {
                // Handle any error when fetching the image from MinIO
                reject(err);
            } else {
                const chunks = [];
                dataStream.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                dataStream.on('end', () => {
                    // Concatenate the binary chunks and resolve with the image data
                    const imageData = Buffer.concat(chunks);
                    resolve(imageData);
                });

                dataStream.on('error', (err) => {
                    reject(err);
                });
            }
        });
    });
};
const createPost = async (req, res) => {
    console.log("hi");
    const content = req.body.content;
    const _userEmail = req.params.userEmail;

    try {
        const user = await Users.findOne({
            userEmail: _userEmail
        })
        console.log(user)

        let newPost = await Posts.create({
            content: content,
            _userId: user.id,
            _userName: user.userName
        })

        await Notifications.create({
            notification: user.userName + " created a new post",
            _postId: newPost._id,
            _userName: user.userName
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