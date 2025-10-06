const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/userModel');

// create new user

const createUser = async (req, res) => {

    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const isExistingUser = await User.findOne({ email });

        if (isExistingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(10);

        const haashedPassword = await bcrypt.hash(password, salt);

        await User.create({ firstName, lastName, email, password: haashedPassword });

        res.status(200).json('User created successfully');

    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}

// get all users 
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');

        res.status(200).json(users);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


module.exports = { createUser, getUsers };