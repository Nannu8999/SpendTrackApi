const express = require('express');
const routes = express.Router();
const user = require('../models/userModel');
const { createUser, getUsers } = require('../controllers/userController');

// Create a new user
routes.post('/', createUser);

// Get all users
routes.get('/', getUsers);

module.exports = routes;