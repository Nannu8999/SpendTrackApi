const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');
const schema = mangoose.Schema;

const userSchema = new schema({

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

}, { timeseriestamps: true });

module.exports = mongoose.model('User', userSchema);