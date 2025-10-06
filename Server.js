const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();


const PORT = process.env.PORT;
const app = express();
const workoutRoutes = require('./Routes/workouts');
const userRoutes = require('./Routes/users');

// middleware
app.use(express.json());

// logging middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/workouts', workoutRoutes);
app.use('/api/users', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {

    app.listen(PORT, () => {
        console.log('Connected to Db & Server is running on port', PORT);
    });

}).catch((error) => {

    console.log('Error connecting to DB', error);

});




