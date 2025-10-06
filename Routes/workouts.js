const express = require('express');
const routes = express.Router();
const Workout = require('../models/workoutModel');
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout } = require('../controllers/workoutController');

// Get all workouts
routes.get('/', getWorkouts);

// Get a single workout
routes.get('/:id', getWorkout);

// Create a workout
routes.post('/', createWorkout);

// Update a workout
routes.patch('/:id', updateWorkout);

// Delete a workout
routes.delete('/:id', deleteWorkout);

module.exports = routes;
