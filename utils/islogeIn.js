// const {expressjwt} = require('express-jwt')
// exports.isloggedIn = expressjwt({
//     getToken: (req, res) => req.cookies.token,
//     secret: "jdkshkjhgba",
//     algorithms:["HS256"],
// });


const jwt = require('jsonwebtoken');

exports.isloggedIn = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "You are not logged in"
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        req.user = decoded;
        next();
    });
}

