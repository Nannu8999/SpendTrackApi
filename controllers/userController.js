const bcrypt = require('bcrypt');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
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
        const hashedPassword = await bcrypt.hash(password, salt);

        //  Create Stripe customer
        const customer = await stripe.customers.create({
            name: `${firstName} ${lastName}`,
            email,
        });


        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            stripeCustomerId: customer.id
        });

        res.status(200).json({
            message: 'User created successfully',
            user,
        });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


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