const jwt = require('jsonwebtoken');

exports.sendToken = (res, statuscode, user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    const cookieOptions = {
        expire:
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        httpOnly: true
    };

    res.status(statuscode)
        .cookie('token', token, cookieOptions)
        .json({ token, user });

}