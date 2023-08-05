const notificationController = require('../controller/notificationController')
const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');

router.get('/get', notificationController.getAll)


module.exports = router