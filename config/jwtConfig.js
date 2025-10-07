require("dotenv").config();

module.exports = {
    secret: process.env.JWT_SECRET,
    accessExpiry: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
};