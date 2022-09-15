const jwt = require('jsonwebtoken');
require('dotenv').config();

const KEY = process.env.JWT_ACCESS_TOKEN;
const REFRESHKEY = process.env.JWT_REFRESH_TOKEN;
const createJWT = (data, expiresIn, type = 'token') => {
    let key = KEY;
    if (type === 'refreshToken') key = REFRESHKEY;
    let token = null;
    try {
        token = jwt.sign(data, key, { expiresIn: expiresIn });

    } catch (error) {
        console.log(error)
    }
    return token;
}

const verifyToken = (token) => {
    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    } catch (err) {
        console.log(err)
    }
    return decoded;
}

module.exports = {
    createJWT,
    verifyToken
}