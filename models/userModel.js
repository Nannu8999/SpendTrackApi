const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema(
    {
        userId: {
            type: Number,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        stripeCustomerId: {
            type: String,
            trim: true,
        },
        isSubscribed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
