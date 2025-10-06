const mangoose = require('mongoose');
const scema = mangoose.Schema;

const workoutShema = new scema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mangoose.model('Workout', workoutShema);