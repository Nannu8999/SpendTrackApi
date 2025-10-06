const mongoose = require('mongoose');
const Workout = require('../models/workoutModel');

// Get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.status(200).json(workouts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get workout by id
const getWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid workout ID' });
    }

    try {
        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({ error: 'No such workout' });
        }

        res.status(200).json(workout);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Create a workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    try {
        const workout = await Workout.create({ title, reps, load });
        res.status(201).json(workout);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid workout ID' });
    }

    try {
        const workout = await Workout.findOneAndDelete({ _id: id });

        if (!workout) {
            return res.status(404).json({ error: 'No such workout' });
        }

        res.status(200).json(workout);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// update a workout

const updateWorkout = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid workout ID' });
    }

    try {

        const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

        if (!workout) {

            return res.status(404).json({ error: 'No such workout' });
        }

        res.status(200).json(workout);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
};
