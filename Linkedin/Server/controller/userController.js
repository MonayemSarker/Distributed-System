const { Users } = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;

const signUp = async (req, res) => {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const password = req.body.password;
    try {

        bcrypt.hash(password, 10).then(async (hash) => {
            await Users.create(
                {
                    userName: userName,
                    userEmail: userEmail,
                    password: hash
                }
            )
            res.json({ message: "Sign Up Successful" })
        })

    } catch (error) {
        res.json(error);
    }
}

const getUser = async (req, res) => {
    const userEmail = req.body.userEmail;
    try {
        await Users.findOne({
            userEmail: userEmail
        }).then((user) => {
            console.log(user);
            res.json(user);
        })
    } catch (error) {

    }
}

const login = async (req, res) => {
    const userEmail = req.body.userEmail;
    const password = req.body.password;

    try {
        await Users.findOne({ userEmail: userEmail }).then((foundUSer) => {
            bcrypt.compare(password, foundUSer.password).then((match) => {
                if (!match) {
                    res.json({ message: "LogIn failed" });
                } else {
                    const user = {
                        userEmail: foundUSer.userEmail
                    }
                    const accessToken = jwt.sign(user, jwtSecretKey);
                    res.status(200).json({
                        token: accessToken,
                        id: foundUSer._id
                    })
                }
            })
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    signUp,
    login,
    getUser
}