const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../utils/tokenUtils");
const User = require("../models/userModel");

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });


    const token = generateAccessToken({ id: user._id, email: user.email });

    res.json({
        message: "Login successful",
        token,
        user: { isSubscribed: user.isSubscribed },
    });
};

module.exports = { login };