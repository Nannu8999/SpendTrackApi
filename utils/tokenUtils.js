const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

exports.generateAccessToken = (payload) => {
    return jwt.sign(payload, jwtConfig.secret, {
        expiresIn: jwtConfig.accessExpiry,
    });
};

exports.generateRefreshToken = (payload) => {
    return jwt.sign(payload, jwtConfig.secret, {
        expiresIn: jwtConfig.refreshExpiry,
    });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, jwtConfig.secret);
};
