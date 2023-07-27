const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');;
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routerUser = require('./routes/userRoute.js')
app.use('/user', routerUser);

const routerPost = require('./routes/postRoute.js')
app.use('/post', routerPost);

const port = process.env.PORT

mongoose.connect("mongodb://localhost:27017/LinkedIn?retryWrites=true&w=majority").then((result) => {
    app.listen(8080, () => {
        console.log("Server is running on port " + port);
    })
})
app.get('/', (req, res) => {
    console.log(port)
    res.json({ message: 'Hello' })
})
