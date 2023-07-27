const postController = require('../controller/postController')
const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');

router.post('/create/:id', authentication, postController.createPost)
// router.get('/get', authentication, postController.getPosts)
router.get('/get', authentication, postController.getPosts)

module.exports = router