// Load environment variables at the very top
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 4000;
const app = express();

// Routes
const userRoutes = require('./Routes/users');
const authRoutes = require('./Routes/auth');
const productsRoutes = require('./Routes/stripe/products');

// CORS setup
const allowedOrigins = ["http://localhost:3000"];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));

// Middleware
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to DB & Server running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.log('Error connecting to DB:', error);
    });
