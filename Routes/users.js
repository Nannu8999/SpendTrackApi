const express = require('express');
const routes = express.Router();
const { createUser, getUsers } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

// Create a new user
routes.post('/createUser', createUser);

// Get all users
routes.get('/getUsers', verifyToken, getUsers);

module.exports = routes;