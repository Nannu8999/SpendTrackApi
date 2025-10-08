const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');       // 1️⃣ import cors
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
const userRoutes = require('./Routes/users');
const authRoutes = require('./Routes/auth');
const products = require('./Routes/stripe/products');

const allowedOrigins = [
    "http://localhost:3000"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // allow Postman, curl
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true // if you use cookies or auth headers
}));

// middleware
app.use(express.json());

// logging middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', products);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Connected to Db & Server is running on port', PORT);
        });
    })
    .catch((error) => {
        console.log('Error connecting to DB', error);
    });
