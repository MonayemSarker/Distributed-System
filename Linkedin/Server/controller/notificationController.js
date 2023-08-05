const { Posts } = require('../models/postModel');
const { Notifications } = require('../models/notificationModel');
const { Users } = require('../models/userModel');



const getAll = async (req, res) => {
    try {
        const sixHoursAgo = new Date();
        sixHoursAgo.setHours(sixHoursAgo.getHours() - 6);


        await Notifications.deleteMany({ createdAt: { $lt: sixHoursAgo } });

        const newNotifications = await Notifications.find();
        res.json(newNotifications);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {
    getAll,
}  
