const userController = require('../controller/userController')
const express = require('express');
const router = express.Router();

router.post('/signUp', userController.signUp);
router.post('/login', userController.login);
router.get('/getUser', userController.getUser);


module.exports = router;