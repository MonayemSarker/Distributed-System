const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    // console.log(req.headers['authorization']);

    const token = authHeader && authHeader.split(' ')[1];
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJqYWhpbkBnbWFpbC5jb20iLCJpYXQiOjE2OTAwNDExMDB9.d9XOvKRD6uD7DkVhKcizHqbk822IX7HQHPgM7aojNzA";
    if (token == null) {

        return res.sendStatus(403);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        // console.log(user)
        req.user = user;
        next();
    });

}

module.exports = authenticateToken;