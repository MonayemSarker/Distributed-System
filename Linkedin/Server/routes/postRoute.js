const postController = require('../controller/postController')
const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');

router.post('/create/:userEmail', postController.createPost, authentication)
// router.post('/create/:id', postController.createPost)
// router.get('/get', authentication, postController.getPosts)
router.get('/get', authentication, postController.getPosts)
router.get('/getOne/:postId', postController.getOnePost);
router.post('/upload', postController.uploadImage);

module.exports = router